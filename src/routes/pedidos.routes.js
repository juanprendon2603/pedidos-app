const express = require("express");
const router = express.Router();

// Controller
const {
  renderPedidoForm,
  createNewPedido,
  renderPedidos,
  renderEditForm,
  updatePedido,
  deletePedido
} = require("../controllers/pedidos.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

// New Note
router.get("/pedidos/add", isAuthenticated, renderPedidoForm);

router.post("/pedidos/new-pedido", isAuthenticated, createNewPedido);

// Get All Notes
router.get("/pedidos", isAuthenticated, renderPedidos);

// Edit Notes
router.get("/pedidos/edit/:id", isAuthenticated, renderEditForm);

router.put("/pedidos/edit-pedido/:id", isAuthenticated, updatePedido);

// Delete Notes
router.delete("/pedidos/delete/:id", isAuthenticated, deletePedido);

module.exports = router;
