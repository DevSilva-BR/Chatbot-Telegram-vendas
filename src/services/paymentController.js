// paymentService.js

const { PrismaClient } = require("@prisma/client");

class paymentController {
  constructor() {
    this.prisma = new PrismaClient();
  }

  // Método para obter informações de pagamento por ID
  async getPaymentInfo(paymentId) {
    try {
      const paymentInfo = await this.prisma.payment.findUnique({
        where: { id: paymentId },
      });

      return paymentInfo;
    } catch (error) {
      console.error("Erro ao obter informações de pagamento:", error);
      throw error;
    }
  }
  // Método para processar um pagamento concluído
  async processCompletedPayment(paymentId) {
    try {
      const completedPayment = await this.prisma.order.update({
        where: { id: paymentId },
        data: { status: "COMPLETED" },
      });

      return completedPayment;
    } catch (error) {
      console.error("Erro ao processar pagamento concluído:", error);
      throw error;
    }
  }
  // Método para verificar o status de um pagamento
  async checkPaymentStatus(paymentId) {
    try {
      const paymentStatus = await this.prisma.order
        .findUnique({
          where: { id: paymentId },
        })
        .status();

      return paymentStatus;
    } catch (error) {
      console.error("Erro ao verificar o status do pagamento:", error);
      throw error;
    }
  }

  async savePaymentOrder(userId, userName, nick, ctx) {
    try {
      const order = await this.prisma.order.create({
        data:{
		    chatId: userId,
        buyerName: userName,
        buyerUser: nick,
        status: "pending", // Defina o status inicial como pendente
        remarketStage: 0,
        createdAt: new Date(),
		}
      });
    console.log("Pedido criado com sucesso:", order);

      return order;
    } catch (error) {
      console.error("Erro ao salvar pedido no banco de dados:", error);
      throw error;
    }
  }
}

module.exports = paymentController;