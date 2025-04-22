from rest_framework import serializers
from .models import Transaction, Status, TransactionType, Category, SubCategory


class TransactionSerializer(serializers.ModelSerializer):
    status = serializers.StringRelatedField()
    transaction_type = serializers.StringRelatedField()
    category = serializers.StringRelatedField()
    subcategory = serializers.StringRelatedField()

    class Meta:
        model = Transaction
        fields = '__all__'

class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = '__all__'

class TransactionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionType
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class SubCategorySerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    class Meta:
        model = SubCategory
        fields = '__all__'
