from django.db import models


class Status(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name="Статус")

    def str(self):
        return self.name

    class Meta:
        verbose_name = "Статус"
        verbose_name_plural = "Статусы"


class TransactionType(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name="Тип операции")

    def str(self):
        return self.name

    class Meta:
        verbose_name = "Тип операции"
        verbose_name_plural = "Типы операций"


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name="Категория")

    def str(self):
        return self.name

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"


class SubCategory(models.Model):
    name = models.CharField(max_length=100, verbose_name="Подкатегория")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="subcategories", verbose_name="Категория")

    def str(self):
        return f"{self.category.name} → {self.name}"

    class Meta:
        unique_together = ("name", "category")
        verbose_name = "Подкатегория"
        verbose_name_plural = "Подкатегории"


class Transaction(models.Model):
    created_at = models.DateField(auto_now_add=False, verbose_name="Дата создания")
    status = models.ForeignKey(Status, on_delete=models.SET_NULL, null=True, verbose_name="Статус")
    transaction_type = models.ForeignKey(TransactionType, on_delete=models.SET_NULL, null=True, verbose_name="Тип")
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, verbose_name="Категория")
    subcategory = models.ForeignKey(SubCategory, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Подкатегория")
    amount = models.DecimalField(max_digits=12, decimal_places=2, verbose_name="Сумма")
    comment = models.TextField(blank=True, null=True, verbose_name="Комментарий")

    def str(self):
        return f"{self.created_at} — {self.transaction_type} — {self.amount}₽"

    class Meta:
        verbose_name = "Транзакция"
        verbose_name_plural = "Транзакции"
