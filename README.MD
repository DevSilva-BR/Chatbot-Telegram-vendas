
# Chatbot para vendas

Um chatbot simples de vendas de grupo vip com api do mercado pago e bot do telegram

## Autores

- [@jemison](https://www.github.com/octokatherine)


## Melhorias

- [ ]  Refatorações
- [ ]  Melhorias de performance
- [ ]  Gerenciamento de grupo
- [ ]  Outras formas de pagamento


## Funcionalidades

- Criação de pagamento
- Verificação de status de pagamento
- Liberação de link depois de pagamento realizado
## Licença

[MIT](https://choosealicense.com/licenses/mit/)

### Estrutura Sugerida do Projeto
chatbot
│
├── src/
│   ├── api/
│   │   ├── mercadoPagoAPI.js       # Integração com a API do Mercado Pago
│   │   └── ...
│   │
│   ├── chatbot/
│   │   ├── botController.js        # Controlador principal do chatbot
│   │   ├── commands.js             # Comandos do chatbot
│   │   ├── actions.js              # Ações do chatbot, como compra, verificação, etc.
│   │   └── messages.js             # Mensagens e templates para o chatbot
│   │
│   ├── database/
│   │   ├── prismaClient.js         # Configuração e instanciação do cliente Prisma
│   │   ├── models/                 # Modelos de dados (se necessário, além do Prisma)
│   │   └── ...
│   │
│   ├── services/
│   │   ├── paymentService.js       # Serviços relacionados a pagamentos
│   │   ├── orderService.js         # Serviços para gerenciamento de pedidos
│   │   └── userService.js          # Serviços relacionados ao usuário (ex: liberação de acesso)
│   │
│   ├── utils/
│   │   ├── logger.js               # Utilitário para logging
│   │   └── helpers.js              # Funções auxiliares diversas
│   │
│   └── app.js                      # Ponto de entrada principal do aplicativo
│
├── .env                            # Variáveis de ambiente
├── package.json
└── README.md