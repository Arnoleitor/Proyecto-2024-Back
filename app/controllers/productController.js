const Producto = require('../models/productModel');
const ExcelJS = require('exceljs');

const postProducto = async (req, res) => {
  try {
    const newProductoData = req.body;
    const newProducto = new Producto(newProductoData);

    // Guardar el precio actual como histórico
    newProducto.historico = {
      precio: newProducto.precio,
      fechaPrecio: new Date(),
    };

    await newProducto.save();
    res.json(newProducto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const postProductoConDescuento = async (req, res) => {
  try {
    const { id } = req.params;
    const { descuento } = req.body;

    if (!id || isNaN(descuento) || descuento < 0 || descuento > 100) {
      return res.status(400).json({ error: 'Parámetros no válidos' });
    }

    const producto = await Producto.findById(id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Nuevo precio con descuento
    const precioConDescuento = producto.precio - (producto.precio * (descuento / 100));

    // Actualiza solo el descuento y el precio con descuento
    producto.descuento = descuento;
    producto.precioConDescuento = precioConDescuento;
    producto.tieneDescuento = true;

    await producto.save();

    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDescuentoProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findById(id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Elimina el descuento y establece tieneDescuento en false
    producto.descuento = 0;
    producto.tieneDescuento = false;

    await producto.save();

    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Recibir los productos por tipo
const getProductosPorTipo = async (req, res) => {
  try {
    const tipoProducto = req.params.tipo;
    const productosPorTipo = await Producto.find({ tipo: tipoProducto });

    const productosConImagenBase64 = productosPorTipo.map(producto => {
      const imagenBase64 = producto.imagen.toString('base64');
      return {
        ...producto.toObject(),
        imagen: `data:image/png;base64,${imagenBase64}`,
      };
    });

    res.status(200).json(productosConImagenBase64);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Recibir los productos de forma masiva por excel
const processExcelAndAddProducts = async (buffer) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);

  const worksheet = workbook.getWorksheet(1);

  worksheet.eachRow(async (row, rowNumber) => {
    try {
      const tipo = parseInt(row.getCell('A').value);
      const descripcion = row.getCell('B').value;
      const precio = parseFloat(row.getCell('C').value);
      const imagen = row.getCell('D').value;

      if (!isNaN(tipo) && !isNaN(precio) && Number(precio) && Number(tipo)) {
        await Producto.create({
          tipo,
          descripcion,
          precio,
          imagen,
        });
      } else {
        console.log(`Fila ${rowNumber} contiene valores no válidos:`);
        console.log(`Tipo: ${tipo}, Descripción: ${descripcion}, Precio: ${precio}, Imagen: ${imagen}`);
      }
    } catch (error) {
      console.log(`Error procesando la fila ${rowNumber}: ${error.message}`);
    }
  });
};

module.exports = { postProducto, getProductosPorTipo, processExcelAndAddProducts, postProductoConDescuento, deleteDescuentoProducto };