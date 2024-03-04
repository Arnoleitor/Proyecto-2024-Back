const Pedidos = require('../models/pedidosModel');
const pdf = require('html-pdf');
const fs = require('fs');
const path = require('path');

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
    const rutaImagenLocal = path.join(__dirname, '../assets/img/LogoFactura.png');
    const imagenBase64 = fs.readFileSync(rutaImagenLocal, { encoding: 'base64' });

    let productosHtmlElement = "";

    if (factura[0]?.productos?.length) {
      productosHtmlElement += `<h2 style="font-weight: bold; text-align: left;">Productos:</h2>`;
      factura[0].productos.forEach(element => {
        let elemento = `
          <div style="text-align: left; margin-bottom: 10px; border-bottom: 1px solid #000;">
            <p>Unidad/es: x ${element.cantidad} - ${element.descripcion} </p> *Importe:<strong> ${element.precio} €</strong>
          </div>`;
        productosHtmlElement += elemento;
      });
    } else {
      productosHtmlElement = `<p style="font-weight: bold; text-align: left;">Sin productos</p>`;
    }
    
    let contenido = `
    <div style="text-align: left; padding: 30px; background-color: GhostWhite;">
    <img src="data:image/jpeg;base64,${imagenBase64}" style="position: absolute; top: 30px; right: 30px; width: 100px; height: auto;" />
        <h1 style="font-weight: bold;">PCPiezas tu tienda de componentes</h1>
        <h5>Dirección de envío: ${factura[0].direccion}</h5>
        ${productosHtmlElement}
        <h3 style="text-align: center; margin-top: 20px; text-decoration: underline;">Importe total: ${factura[0].totalImporte} € IVA Inc.</h3>
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