from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import TransactionViewSet, StatusViewSet, TransactionTypeViewSet, CategoryViewSet, SubCategoryViewSet

router = DefaultRouter()
router.register(r'transactions', TransactionViewSet)
router.register(r'statuses', StatusViewSet)
router.register(r'transactiontypes', TransactionTypeViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'subcategories', SubCategoryViewSet)



urlpatterns = [
    path('', include(router.urls)),
]