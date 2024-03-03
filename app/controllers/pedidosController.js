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
    const _id = req.query.id;
    const factura = await Pedidos.find({ _id: _id });

    let productosHtmlElement = "";

    if (factura[0]?.productos?.length) {
      factura[0].productos.forEach(element => {
        let elemento = `<p>Unidad/es: x ${element.cantidad} - ${element.descripcion}</p>`;
        productosHtmlElement += elemento;
      });
    } else {
      let elemento = `<p>Sin productos</p>`;
      productosHtmlElement += elemento;
    }

    let contenido = `
      <h1>PCPiezas tu tienda de componentes</h1>
      <p>Dirección de envío: ${factura[0].direccion}</p>
      <p>Productos:</p>
      ${productosHtmlElement}
      <p>Importe total: ${factura[0].totalImporte} €</p>
      <p>Teléfono de contacto: 999777666</p>
    `;

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