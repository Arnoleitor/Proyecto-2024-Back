const Pedidos = require('../models/pedidosModel');
const pdf = require('html-pdf');

const getPedidos = async (req, res) => {
  try {
    const pedidos = await Pedidos.find();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getPedidosByUserId = async (req, res) => {
  try {
    const id = req.query.id;
    const pedidos = await Pedidos.find({ id: id });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const postPedidos = async (req, res) => {
  try {
    const newPedido = new Pedidos(req.body);
    await newPedido.save();
    res.json(newPedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFactura = async (req, res) => {
  try {
    const id = req.query.id;
    const factura = await Pedidos.find({ id: id });
    console.log("🚀 ~ getFactura ~ factura:", factura)
    let productosHtmlElement = ""
    if (factura[0]?.productos?.length) {
      factura[0].productos.forEach(element => {
        let elemento = `<p>${element.cantidad}</p>`
        productosHtmlElement += elemento
      })
    } else {
      let elemento = `<p>Sin productos</p>`
      productosHtmlElement += elemento
    }
    let contenido = `
      <h1>PCPiezas tu tienda de componentes</h1>
      <p>${factura[0].totalImporte}</p>
      <p>${factura[0].direccion}</p>
      `;
    contenido += productosHtmlElement
    res.setHeader('Content-type', 'application/pdf');
    pdf.create(contenido).toStream(function (err, stream) {
      if (err) return res.send(err);
      res.type('pdf');
      stream.pipe(res);
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { getPedidos, postPedidos, getPedidosByUserId, getFactura };