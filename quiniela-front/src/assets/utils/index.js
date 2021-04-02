const utils = {
  insertBody(elx) {
    document.body.insertBefore(elx, document.body.firstChild)
  },
  removeBody(element) {
    let bodyx = document.body
    bodyx.removeChild(element)
  },
  changePosition(elx, content, conditional) {
    let topx = 0
    let leftx = 0
    let widthx = 0
    let scrollTopx = window.pageYOffset || document.documentElement.scrollTop
    if (elx.getBoundingClientRect().top + 300 >= window.innerHeight) {
      setTimeout(() => {
        if (conditional) {
          topx =
            elx.getBoundingClientRect().top - content.clientHeight + scrollTopx
        } else {
          topx =
            elx.getBoundingClientRect().top -
            content.clientHeight +
            elx.clientHeight +
            scrollTopx
        }
      }, 1)
    } else {
      topx = conditional
        ? elx.getBoundingClientRect().top + elx.clientHeight + scrollTopx + 5
        : elx.getBoundingClientRect().top + scrollTopx
    }

    leftx = elx.getBoundingClientRect().left
    widthx = elx.offsetWidth

    let cords = {
      left: `${leftx}px`,
      top: `${topx}px`,
      width: `${widthx}px`,
    }

    return cords
  },
  /**
   * Modifica el string de error para hacerlo más legible.
   *
   * @param {String} msg Cadena de error
   */
  formatMsg(msg) {
    msg = msg.replace('non_field_errors: ', '')
    msg = msg.replace('[object Object]', '')
    msg = msg.replace('products:', '')
    msg = msg.replace('quantity', 'Cantidad')
    msg = msg.replace('minBuyQuantity:', '')

    return msg
  },
  getErrorDetails(errors, productDetail = []) {
    var toType = function (obj) {
      return {}.toString
        .call(obj)
        .match(/\s([a-zA-Z]+)/)[1]
        .toLowerCase()
    }

    let errorDetails = ''
    let messages = ''
    errors.some((err) => {
      if (toType(err['message']) === 'object') {
        let messagesObj = err['message']
        Object.keys(messagesObj).some((messageInput) => {
          if (toType(messagesObj[messageInput]) === 'object') {
            let messagesObj2 = messagesObj[messageInput]
            Object.keys(messagesObj2).some((messageInput2) => {
              let formatMessage2 = messagesObj2[messageInput2]
              messages += `${messageInput2}: ${formatMessage2} \n`
            })
          } else {
            let formatMessage = messagesObj[messageInput]
            messages += `${messageInput}: ${formatMessage} \n`
          }
          return true
        })
      } else {
        messages = err['message']
      }
      let field = err['field']
      if (field === 'product_detail_add') {
        field += `(${productDetail[Object.keys(err['message'])[0]].name})`
      }
      errorDetails += `${field}: ${messages} \n`
      return true
    })

    return utils.formatMsg(errorDetails)
  },
  randomId() {
    let id = ''
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < 32; i++) {
      id += characters.charAt(Math.floor(Math.random() * 36))
    }
    return id
  },
  getUrlVars() {
    let vars = {}
    window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function (m, key, value) {
        vars[key] = value
      }
    )
    return vars
  },
  isString(value) {
    return typeof value === 'string' || value instanceof String
  },
  /**
   * Función utilizada en pantalla de checkout y carrito de ventas para calcular el precio final de venta del artículo.
   *
   * @param {Object} product - Objeto del producto en el carrito
   * @param {number} purchaseAmmount - Cantidad de objetos en el carrito
   *
   * @return {number} Precio final de los elementos
   */
  getFinalPrice(product, purchaseAmmount) {
    let finalPrice = product.productDetailActive.finalPrice
    let finalAmmount = purchaseAmmount
    let finalItemDiscounts = 0

    // Verifica si hay promocion por cantidad
    if (
      product.productDetailActive.promotionDetailPromotion.hasPromotionQuantity
    ) {
      let timesDiscountApplied = 0
      let auxQuantity = purchaseAmmount
      let itemsQuantityDifference =
        product.productDetailActive.promotionDetailPromotion
          .promotionQuantityTake -
        product.productDetailActive.promotionDetailPromotion
          .promotionQuantityBuy
      // Calcula el total de productos que sí contarán para el cálculo final
      while (
        auxQuantity >
        product.productDetailActive.promotionDetailPromotion
          .promotionQuantityBuy
      ) {
        auxQuantity =
          auxQuantity -
          product.productDetailActive.promotionDetailPromotion
            .promotionQuantityTake
        if (auxQuantity < 0) {
          auxQuantity = 0
        }
        // Total de veces que se aplica el descuento
        timesDiscountApplied = timesDiscountApplied + 1
      }
      // Cantidad de unidades descontadas totales
      finalItemDiscounts = itemsQuantityDifference * timesDiscountApplied

      // Total de elementos utilizados para el cálculo del precio final
      finalAmmount = finalAmmount - finalItemDiscounts
    }
    return (finalPrice * finalAmmount) / product.baseUnit
  },
}

module.exports = utils
