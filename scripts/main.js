/****************************************** */
/*********** 1er ENTREGA ******************* */
/*********** BORIS CHOQUE ***************** */
/****************************************** */


/* Variable de referencia */
let cantPedido = 0;
let totalParcial = 0;
let contadorCompra = 0;
let total = 0;
let cantidad_total = 0;
let cantidadPedida = 0;
let producto = "";
let precio = 0;
let parcial = 0;
let iva = 0;
let valorFinal = 0;
let beneficio = "";
let listaCompras = [];

/******************************************* */
/*********** DEFINICION ******************* */
/*********** DE CLASES ********************* */
/****************************************** */

class Producto {
    constructor (idProducto,nombreProducto,valorProducto){
        this.idProducto = idProducto;
        this.nombreProducto = nombreProducto;
        this.valorProducto = valorProducto;
    };
};

class Compra {
    constructor (cantCompra,valorUnitario){
        this.cantCompra = cantCompra;
        this.valorUnitario = valorUnitario;
    };
    calculoParcial(){
        totalParcial = (this.valorUnitario*this.cantCompra);
        return totalParcial;
    };
};

class RegistroCompra{
    constructor(num_compra,nom_producto,can_compra,total_compra){
        this.num_compra = num_compra;
        this.nom_producto = nom_producto;
        this.can_compra = can_compra;
        this.total_compra = total_compra;
    };
};

class Impuestos {
    constructor (preciototal){
        this.preciototal = preciototal;
    }
    calculoIva(){
        iva = this.preciototal * 0.21;
        valorFinal = iva + total;
        return iva;
    };
};

class Beneficios {
    constructor (cantidadTotal){
        this.cantidadTotal = cantidadTotal;
    }
    porCantidad(){
        if (this.cantidadTotal >= 5){
            /* El usuario obtiene el beneficio de envio gratis */
            beneficio = "SI";
        }else {
            beneficio = "NO";
        }
        return beneficio;
    }
}

/******************************************* */
/*********** DECLARACION ******************* */
/*********** DE FUNCIONES ****************** */
/****************************************** */
/* Función 01 - Pedido de confirmaciòn al usuario */
function compraConfirmacion(){
    /* Se define variable auxiliar para realizar el corte del bucle */
    let corte1=true;
    /* Ciclo while para confirmación por parte del usuario de la elección del producto */
    item(listaProductos);
    while (corte1){
        let confirm = prompt("Ya elegiste el producto ? "+"\n1 -> SI \n2 -> NO");
        if (parseInt(confirm) === 1){
            corte1 = false;
        }else{
            alert("Para seleccionar producto, mira la opciones en consola")
            console.log("Ya elegiste el producto ? "+"\n1 -> SI \n2 -> NO");
        }
    };
};

/* Función 02 - Lista de productos en consola */
function item(args){
    console.log("-------------------------------------");
    console.log("Códigos de producto:");
    for (let i = 0; i < args.length; i++){
        console.log(`${args[i].idProducto} ----> ${args[i].nombreProducto} ----> $${args[i].valorProducto} c/uni`);
    };
};

/* Función 03 - Resumen de compra parcial */
function resumenCompraparcial(prod,prec,cant,tot){
    /* Resumen de compra */
    let aviso0 = `Numero de compra: ${contadorCompra}`
    let aviso1 = `Producto: ${prod}`;
    let aviso2 = `Precio por unidad: $${prec}`;
    let aviso3 = `Cantidad pedida: ${cant} Uni`;
    let aviso4 = `Total de esta compra: $${tot}`;
    console.log("-------------------------------------");
    console.log("Resumen Compra Parcial...");
    console.log(aviso0);
    console.log(aviso1);
    console.log(aviso2);
    console.log(aviso3);
    console.log(aviso4);
    };

/* Función 04 - Resumen de compra final */
function resumenComprafinal(tot,contador,iva,final,ben,unid){
    let aviso5 = `Numero de compras realizadas: ${contador}`;
    let aviso6 = `Precio de productos: $${tot}`;
    let aviso7 = `IVA (21%): $${iva}`;
    let aviso8 = `Total a pagar: $${final}`;
    let aviso9 = `Total Unidades: ${unid} Uni`;
    let aviso10 = `Envio gratis ? -> ${ben}`;
    console.log("-------------------------------------");
    console.log("RESUMEN DE COMPRA:");
    console.log(aviso5);
    console.log(aviso6);
    console.log(aviso7);
    console.log(aviso8);
    console.log(aviso9);
    console.log(aviso10);
};

/* Función 05 - Determinación de cantidad de productos pedidos */
function pedidoProducto(){
    let corte3 = true;
    while (corte3){
        cantidadPedida = parseInt(prompt("¿Cuántos productos quieres?"));
        if (cantidadPedida > 0){
            corte3 = false;
        }else{
            alert("POR FAVOR INGRESE UN VALOR ENTERO POSITIVO");
        }
    }
    return cantidadPedida;
};

/* Función 06 - Proceso de compra */
function procesoCompra(args){

    do{
        
        let codProd = prompt("Indique código de producto").toUpperCase();
        const verifCod = args.find(codigo => codigo.idProducto == codProd);
        if (verifCod == undefined){
            alert("NO ES VALIDA EL CÒDIGO INGRESADO, POR FAVOR REVISA LOS CÒDIGOS VÀLIDOS EN LA CONSOLA");
            console.log(`Por favor revisa los códigos en consola\nNo esta ingresando la opción correcta`);
        }else{
            /* Contador de compra */
            contadorCompra++;
            /* Determinación de cantidad del pedido */
            cantPedido = pedidoProducto();
            /* Inicio de instación de compra */
            const com_producto = new Compra(cantPedido,verifCod.valorProducto);
            parcial = com_producto.calculoParcial();
            resumenCompraparcial(verifCod.nombreProducto,verifCod.valorProducto,cantPedido,parcial);
            /* DECLARACION DE INSTANCIAS DE REGISTRO DE COMPRAS */
            const registro_compra = new RegistroCompra(contadorCompra,verifCod.nombreProducto,cantPedido,parcial);
            /* REGISTRO DE COMPRA EN LISTA */
            listaCompras.push(registro_compra);
            cantidad_total += cantPedido;
            total += parcial;
        };
        console.log("-------------------------------------");
        console.log("HACIENDO MAS DE 5 Unidades");
        console.log("OBTENES EL BENEFICIO DEL ENVIO GRATIS");
        console.log("-------------------------------------");
        otroPedido = confirm("¿Desea realizar otro pedido?");
        if (otroPedido){
            item(listaProductos);
        }
    }while(otroPedido)
};


/******************************************* */
/*********** DECLARACION ******************* */
/*********** DE INSTANCIAS ***************** */
/****************************************** */

/* DECLARACION DE INSTANCIAS DE PRODUCTOS */
const prod_PE = new Producto("PE","PERFUME",2000);
const prod_JA = new Producto("JA","JABON",100);
const prod_SH = new Producto("SH","SHAMPOO",500);
const prod_CR = new Producto("CR","CREMA",200);
const prod_MA = new Producto("MA","MAQUILLAJE",300);

/* LISTA DE PRODUCTOS */
const listaProductos = [prod_PE,prod_JA,prod_SH,prod_CR,prod_MA];

/****************************************** */
/*********** INICIO DE  ******************* */
/*********** PROGRAMA   ******************* */
/****************************************** */

console.clear();
/* Intrucciones para el usuario*/
alert("Para seleccionar el producto"+"\nseleccione el código asociado"+"\nVer las opciones en consola:");

/* Funciones aplicadas */
compraConfirmacion();
procesoCompra(listaProductos);
const imp = new Impuestos(total).calculoIva();
const ben = new Beneficios(cantidad_total).porCantidad();
resumenComprafinal(total,contadorCompra,imp,valorFinal,ben,cantidad_total);

/* HABILITAR PARA VISUALIZAR EN CONSOLA LISTA DE REGISTRO DE COMPRAS */
console.log(listaCompras);

/******************************************* */
/*********** DECLARACIONES ******************* */
/*********** PARA CARGA DE ******************* */
/*********** PAGINA PREVIA ******************* */
/****************************************** */

// const overlay=document.getElementById("spin");
// setTimeout(()=>{
//     overlay.classList.add("hidden");
// },2000);