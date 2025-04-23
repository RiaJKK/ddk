from django.contrib import admin
from .models import Status, TransactionType, Category, SubCategory, Transaction, CategoryTransactionType
from django.contrib.admin import SimpleListFilter
from django.utils.translation import gettext_lazy as _
from django import forms

@admin.register(Status)
class StatusAdmin(admin.ModelAdmin):
    list_display = ('name',)
    list_filter = ('name',)


@admin.register(CategoryTransactionType)
class CategoryTransactionTypeAdmin(admin.ModelAdmin):
    list_display = ('category', 'transaction_type')
    list_filter = ('category',)


@admin.register(TransactionType)
class TransactionTypeAdmin(admin.ModelAdmin):
    list_display = ('name',)
    list_filter = ('name',)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    list_filter = ('name',)


@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    list_filter = ('name', 'category')


# Кастомный фильтр для дат
class DateRangeFilter(SimpleListFilter):
    title = _('Дата создания')
    parameter_name = 'date_range'

    def lookups(self, request, model_admin):
        return (
            ('last_week', _('На прошлой неделе')),
            ('last_month', _('На прошлом месяце')),
            ('this_month', _('В этом месяце')),
            ('custom', _('Пользовательский диапазон')),
        )

    def queryset(self, request, queryset):
        from datetime import timedelta
        from django.utils import timezone

        today = timezone.now().date()

        if self.value() == 'last_week':
            start_date = today - timedelta(days=today.weekday() + 7)
            end_date = start_date + timedelta(days=6)
            return queryset.filter(created_at__gte=start_date, created_at__lte=end_date)

        elif self.value() == 'last_month':
            start_date = today.replace(day=1) - timedelta(days=1)
            start_date = start_date.replace(day=1)
            end_date = today.replace(day=1) - timedelta(days=1)
            return queryset.filter(created_at__gte=start_date, created_at__lte=end_date)

        elif self.value() == 'this_month':
            start_date = today.replace(day=1)
            end_date = today.replace(day=28) + timedelta(days=4)
            end_date = end_date.replace(day=1) - timedelta(days=1)
            return queryset.filter(created_at__gte=start_date, created_at__lte=end_date)

        elif self.value() == 'custom':
            # Можно добавить пользовательские фильтры через дополнительные поля в интерфейсе
            pass

        return queryset


# Форма для добавления/редактирования транзакции
class TransactionAdminForm(forms.ModelForm):
    class Meta:
        model = Transaction
        fields = ['created_at', 'status', 'transaction_type', 'category', 'subcategory', 'amount', 'comment']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Фильтруем подкатегории на основе выбранной категории
        if self.instance and self.instance.category:
            self.fields['subcategory'].queryset = SubCategory.objects.filter(category=self.instance.category)

        # Для новых записей, когда категория ещё не выбрана
        if 'category' in self.data:
            try:
                category_id = int(self.data.get('category'))
                self.fields['subcategory'].queryset = SubCategory.objects.filter(category_id=category_id)
            except (ValueError, TypeError):
                pass

        # Получаем все категории, связанные с типом транзакции
        if self.instance and self.instance.transaction_type:
            self.fields['category'].queryset = Category.objects.filter(
                categorytransactiontype__transaction_type=self.instance.transaction_type
            )

        if 'transaction_type' in self.data:
            try:
                transaction_type_id = int(self.data.get('transaction_type'))
                self.fields['category'].queryset = Category.objects.filter(
                    categorytransactiontype__transaction_type_id=transaction_type_id
                )
            except (ValueError, TypeError):
                pass

        if 'category' in self.data:
            try:
                category_id = int(self.data.get('category'))
                self.fields['subcategory'].queryset = SubCategory.objects.filter(category_id=category_id)
            except (ValueError, TypeError):
                pass

    def clean(self):
        cleaned_data = super().clean()

        # Валидация на обязательность полей
        transaction_type = cleaned_data.get('transaction_type')
        category = cleaned_data.get('category')
        subcategory = cleaned_data.get('subcategory')
        amount = cleaned_data.get('amount')

        if not transaction_type:
            raise forms.ValidationError("Тип операции обязателен.")
        if not category:
            raise forms.ValidationError("Категория обязательна.")
        if not subcategory:
            raise forms.ValidationError("Подкатегория обязательна.")
        if not amount:
            raise forms.ValidationError("Сумма обязательна.")

        return cleaned_data

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    form = TransactionAdminForm
    list_display = ('created_at', 'status', 'transaction_type', 'category', 'subcategory', 'amount', 'comment')
    list_filter = ('status', 'transaction_type', 'category', 'subcategory')

