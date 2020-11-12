const { Schema, model } = require("mongoose");

const PedidoSchema = new Schema(
  {
    fecha: {
      type: String,
      required: true
    },
    cliente: {
      type: String,
      required: true
    },
    telefono: {
      type: String,
      required: true
    },
    tipo: {
      type: String,
      required: true
    },
    tamaño: {
      type: String,
      required: true
    },
    decoracion: {
      type: String,
      required: true
    },
    hora: {
      type: String,
      required: true
    },
    valor: {
      type: String,
      required: true
    },
    detalles: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Pedido", PedidoSchema);
