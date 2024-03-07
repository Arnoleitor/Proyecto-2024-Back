const Producto = require('../models/productModel');
const ExcelJS = require('exceljs');

const postProducto = async (req, res) => {
    try {
      const newProducto = new Producto(req.body);
      await newProducto.save();
      res.json(newProducto);
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

      if (!isNaN(tipo) && !isNaN(precio) && Number(precio)  && Number(tipo)) {
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





module.exports = { postProducto, getProductosPorTipo, processExcelAndAddProducts };