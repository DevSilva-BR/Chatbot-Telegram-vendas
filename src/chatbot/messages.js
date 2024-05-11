const startMessage = `Bem-vindo ao nosso serviço de bot. Como podemos ajudá-lo hoje?`;

const compraMessage = (userName) =>
  `Olá ${userName}, para prosseguir com o pagamento, clique no botão abaixo.`;

const verificaMessage = `Para Verifica o pagamento, clique no botão abaixo.`;

const compraConfirmadaMessage =
  "Você já fez o pagamento. Aguarde a confirmação.";

const erroProcessamentoPagamentoMessage =
  "Não foi possível verificar o status da sua compra no momento.";

const pagamentoPendenteMessage =
  "⌛ Seu pagamento está pendente. Aguarde a aprovação.";

// Adicione mais mensagens conforme necessário

module.exports = {
  startMessage,
  compraConfirmadaMessage,
  erroProcessamentoPagamentoMessage,
  pagamentoPendenteMessage,
  compraMessage,
  verificaMessage,
};
