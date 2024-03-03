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
      productosHtmlElement += `<h2 style="font-weight: bold; text-align: left; padding: 30px;">Productos:</h2>`;
      factura[0].productos.forEach(element => {
        let elemento = `
          <div style="text-align: left; margin-bottom: 10px; border-bottom: 1px solid #000;">
            <p>Unidad/es: x ${element.cantidad} - ${element.descripcion}</p>
          </div>`;
        productosHtmlElement += elemento;
      });
    } else {
      productosHtmlElement = `<p style="font-weight: bold; text-align: left;">Sin productos</p>`;
    }

    let contenido = `
      <div style="text-align: left; padding: 30px;">
        <h1 style="font-weight: bold;">PCPiezas tu tienda de componentes</h1>
        <h5>Dirección de envío: ${factura[0].direccion}</h5>
        ${productosHtmlElement}
        <h3 style="text-align: center; margin-top: 20px; text-decoration: underline;">Importe total: ${factura[0].totalImporte} €</h3>
        <p style="text-align: left; margin-top: 20px;">Id de la factura: <span style="font-weight: bold;">${_id}</span></p>
        <p style="text-align: right; margin-top: 10px;">Teléfono de contacto: 999777666</p>
      </div>`;

    res.setHeader('Content-type', 'application/pdf');
    pdf.create(contenido, { format: 'Letter' }).toStream(function (err, stream) {
      if (err) return res.send(err);
      res.type('pdf');
      stream.pipe(res);
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


module.exports = { getPedidos, postPedidos, getPedidosByUserId, getFactura };