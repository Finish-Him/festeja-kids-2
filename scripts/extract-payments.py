#!/usr/bin/env python3
import json

import pandas as pd

# Ler planilha
df = pd.read_excel("/home/ubuntu/upload/Próximasfestas.xlsx", sheet_name="Próximas Festas", skiprows=2)

# Remover linhas vazias
df = df.dropna(subset=["Código"])

# Extrair dados completos incluindo pagamentos
festas = []
for _, row in df.iterrows():
    festa = {
        "codigo": str(row["Código"]) if pd.notna(row["Código"]) else "",
        "cliente": str(row["Cliente"]) if pd.notna(row["Cliente"]) else "",
        "pagamento1": float(row["Pagamento"]) if pd.notna(row["Pagamento"]) else 0,
        "pagamento2": float(row["Pagamento.1"]) if pd.notna(row["Pagamento.1"]) else 0,
        "pagamento3": float(row["Pagamento.2"]) if pd.notna(row["Pagamento.2"]) else 0,
    }
    festas.append(festa)

# Salvar em JSON
with open("/home/ubuntu/festeja-kids-2/scripts/proximasfestas-complete.json", "w", encoding="utf-8") as f:
    json.dump(festas, f, ensure_ascii=False, indent=2)

print(f"✅ {len(festas)} festas com pagamentos extraídas")

# Estatísticas
total_pagamentos = 0
for festa in festas:
    if festa["pagamento1"] > 0:
        total_pagamentos += 1
    if festa["pagamento2"] > 0:
        total_pagamentos += 1
    if festa["pagamento3"] > 0:
        total_pagamentos += 1

print(f"📊 Total de pagamentos individuais: {total_pagamentos}")
