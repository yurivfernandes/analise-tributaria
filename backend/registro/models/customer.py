import uuid

from django.db import models
from django.utils import timezone


class Customer(models.Model):
    REGISTRATION_TYPES = [
        ("individual", "Pessoa Física"),
        ("company", "Pessoa Jurídica"),
    ]
    STATUS_CHOICES = [
        ("active", "Ativo"),
        ("inactive", "Inativo"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_name = models.CharField("Nome Completo", max_length=255)
    registration_type = models.CharField(
        "Tipo de Cadastro", max_length=20, choices=REGISTRATION_TYPES
    )
    phone = models.CharField("Telefone", max_length=20)
    email = models.EmailField("E-mail")
    status = models.CharField(
        "Status", max_length=20, choices=STATUS_CHOICES, default="active"
    )
    created_at = models.DateTimeField("Data de Criação", default=timezone.now)
    updated_at = models.DateTimeField("Última Atualização", auto_now=True)

    class Meta:
        db_table = "customers"
        ordering = ["-created_at"]
        verbose_name = "Cliente"
        verbose_name_plural = "Clientes"

    def __str__(self):
        return self.full_name
