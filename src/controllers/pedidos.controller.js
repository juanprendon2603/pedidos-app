const pedidosCtrl = {};

// Models
const Pedido = require("../models/Pedido");

pedidosCtrl.renderPedidoForm = (req, res) => {
  res.render("pedidos/new-pedido");
};

pedidosCtrl.createNewPedido = async (req, res) => {
  const { fecha, cliente, telefono, tipo, tamaño, decoracion, hora, valor, detalles }= req.body;
     const errors = [];
     if(!fecha) {
         errors.push({text: 'Por favor seleccione una fecha'});
     }
     var moment = require('moment');
    if( moment(fecha).isBetween( moment('2000-01-01'), moment() ) ){
        errors.push({text: 'La fecha es incorrecta'});
      }
    if(!cliente){
        errors.push({text: 'Por favor escriba el nombre del cliente'});
    }
    if(!telefono){
        errors.push({text: 'Por favor escriba el telefono del cliente'});
    }
    if(telefono.length > 10){
      errors.push({text: 'Por favor escriba un numero de telefono valido'});
    }
    if(telefono.length < 7){
    errors.push({text: 'Por favor escriba un numero de telefono valido'});
    }
    if(!tipo){
        errors.push({text: 'Por favor seleccione una fecha'})
    }
    if(!tamaño){
        errors.push({text: 'Por favor escriba el tipo de torta'})
    }
    if(!decoracion){
        errors.push({text: 'Por favor escriba la decoracion de la torta'})
    }
    if(!hora){
        errors.push({text: 'Por favor seleccione una hora de entrega'})
    }
    if(!valor){
        errors.push({text: 'Por favor escriba el valor de la torta'})
    }
    if(!detalles){
        errors.push({text: 'Por favor escriba los detalles del pedido'})
    }
    if(errors.length > 0) {
        res.render('pedidos/new-pedido', {
            errors,
            fecha, 
            cliente, 
            telefono, 
            tipo, 
            tamaño, 
            decoracion, 
            hora, 
            valor, 
            detalles
        });
    } else{
    const newPedido = new Pedido({ fecha, cliente, telefono, tipo, tamaño, decoracion, hora, valor, detalles });
    newPedido.user = req.user.id;
    await newPedido.save();
    req.flash("success_msg", "Pedido añadido exitosamente");
    res.redirect("/pedidos");
  }
};

pedidosCtrl.renderPedidos = async (req, res) => {
  const pedidos = await Pedido.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("pedidos/all-pedidos", { pedidos });
};

pedidosCtrl.renderEditForm = async (req, res) => {
  const pedido = await Pedido.findById(req.params.id).lean();
  if (pedido.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/pedidos");
  }
  res.render("pedidos/edit-pedido", { pedido });
};

pedidosCtrl.updatePedido = async (req, res) => {
  const { fecha, cliente, telefono, tipo, tamaño, decoracion, hora, valor, detalles } = req.body;
  await Pedido.findByIdAndUpdate(req.params.id, { fecha, cliente, telefono, tipo, tamaño, decoracion, hora, valor, detalles });
  req.flash("success_msg", "Pedido actualizado exitosamente");
  res.redirect("/pedidos");
};

pedidosCtrl.deletePedido = async (req, res) => {
  await Pedido.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Pedido eliminado exitosamente");
  res.redirect("/pedidos");
};

module.exports = pedidosCtrl;
