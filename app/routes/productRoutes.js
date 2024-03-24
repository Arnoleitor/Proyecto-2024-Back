const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const upload = multer.memoryStorage();

router.post('/agregarproducto', productController.postProducto);
router.get('/productosPorTipo/:tipo', productController.getProductosPorTipo);
router.post('/productosconDescuento/:id', productController.postProductoConDescuento);
router.put('/deleteDescuentoProducto/:id', productController.deleteDescuentoProducto);

router.post('/agregarproductoExcel', multer({ storage: upload }).single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No se proporcionó ningún archivo.');
    }

    await productController.processExcelAndAddProducts(req.file.buffer);

    res.status(200).send('Archivo procesado exitosamente.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al procesar el archivo.');
  }
});

module.exports = router;
