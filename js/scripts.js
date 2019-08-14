(function (a) {
  a.each(function () {

      var o = $(this),
          elem = {
              dias: $('.dias .num', o),
              horas: $('.horas .num', o),
              min: $('.min .num', o),
              segundos: $('.segundos .num', o)
          },
          a = parseInt($("input.ano", o).val()),
          m = parseInt($("input.mes", o).val()),
          d = parseInt($("input.dia", o).val()),
          h = parseInt($("input.hora", o).val()),
          fb = new Date();

      var contador = window.setInterval(function () {
          var fa = new Date(a, m, d, h);//fa-fecha final
          //fb-fecha actual

          fa.setMonth(fa.getMonth() - 1);
          var xd = fa - fb;

          if (a != undefined && m != undefined && d != undefined && h != undefined && xd > 0) {
              o.slideDown();
          }



          if (xd > 0) {
              xd /= 3600000;
              xd /= 24;
              xd = Math.floor(xd);
              xd = Math.abs(xd);//dias
              xh = h - fb.getHours() - 1;//horas
              if (xh <= 9) (xh < 0) ? xh = (24 - fb.getHours()) + h - 1 : (xh == 0) ? xh = '00' : xh = '0' + xh;
              xm = (60 - fb.getMinutes() - 1);//minutos
              if (xm <= 9) (xm == 0) ? xm = '00' : xm = '0' + xm;
              xs = (60 - fb.getSeconds() - 1);//sec
              if (xs <= 9) (xs == 0) ? xs = '00' : xs = '0' + xs;
              if (xd <= 9) (xd == 0) ? xd = '00' : xd = '0' + xd;
          } else {
              xd = '00', xh = '00', xm = '00', xs = '00';
          };

          fb.setSeconds(fb.getSeconds() + 1);
          elem.dias.html(xd);
          elem.horas.html(xh);
          elem.min.html(xm);
          elem.segundos.html(xs);
          if (xd == '00' && xh == '00' && xm == '00' && xs == '00') {
              clearInterval(contador);
              /*alert("Cuenta atrás finalizada!");*/

              o.slideUp();
              $('.tpl-home-dl').removeClass('sta-contador-visible');
          };
          return { Dias: xd, Horas: xh, Minutos: xm, Segundos: xs };
      }, 1000);

      console.log(elem);
  });
})($('.tpl-time'));

/* Abrir modal */


var openModalAviso = (function (o, $, h) {
    if (o) {
  
      var $o = $(o),
        $html = $('html');
  
      $('.sta-modal-fad_cierre', o).click(close);
  
  
  
      $($o).on("click",function(e) {
                      
        var container = $(".sta-modal-fad_modal");
           if (!container.is(e.target) && container.has(e.target).length === 0) { 
              close();
           }
    });
  
  
      function open() {
        $o.fadeIn(1e3);
        $html.addClass('sta-noScroll');
      }
      function close() {
        $o.fadeOut(1e3);
        $html.removeClass('sta-noScroll');
      }
      $('.sta-hoteles-fad_vermas').click(open);
      return open;
    } else {
      return new Function;
    };
  })(document.querySelector('.tpl-modal-fad'), jQuery, hotusa()); 





(function(o, $, h){
    if(o){
        var clon = $('.sta-hoteles-fad_boxhotels', o).clone(),
        $o = $(o),
        array = window.json_galeriaHv;
        
        $(o).empty();

        for(i = 0; i < array.length; i++){
            console.log(i)
            var clonbl = clon.clone();
            $o.append(clonbl);

            var back = $('.sta-hoteles-fad_boxhotels', o),
            number = $('.sta-hoteles-fad_numero' ,o),
            title = $('.sta-hoteles-fad_hotel', o),
            ciudad = $('.sta-hoteles-fad_ciudad', o),
            num = i + 1;
            


            $(back[i]).css("background-image", "url(" + array[i].background +")");
            $(number[i]).text("0" + num);
            $(ciudad[i]).text(array[i].ciudad);
            $(title[i]).append(array[i].hotel);
        }

    }
 

})(document.querySelector('.sta-hoteles-fad_containerhotels'), jQuery, hotusa());


  /*Galería*/


(function(o, $, h){
    if(o){
        var hoteles = document.querySelectorAll('.sta-hoteles-fad_boxhotels'),
        vermas = document.querySelectorAll('.sta-hoteles-fad_vermas'),
        act = 0, //posicion del array en el que clicamos
        n = 0, //numero de imagenes de cada hotel
        imgi = -1, //controlador img izq
        imgc = 0, //controlador img centro
        imgd = 1, // controlador img derecha
        controlador = 0,
        imgContainer = o.querySelector('.imgcontainer'),
        buttonD = o.querySelector('.sta-modal-fad_buttond'),
        buttonI = o.querySelector('.sta-modal-fad_buttoni');
        
        for (var j = 0; j < hoteles.length; j++) {
            (function(h){
                vermas[j].addEventListener('click', function(){
                    act = h;
                    console.log(act);
                    cargarcontenido(act);
                    cargarimgs();
                })
            })(j)
        };

        function cargarcontenido(act){
            modal = $('.sta-modal-fad_modal'),
            titlemodal = $('.sta-modal-fad_nombre_hotel', modal),
            ciudadmodal = $('.sta-modal-fad_nombre_ciudad', modal),
            listamodal = $('.sta-modal-fad_list', modal),
            obj = window.json_galeriaHv[act];

            titlemodal.text(obj.modal.hotel);
            ciudadmodal.text(obj.modal.ciudad);
            listamodal.text(obj.modal.info);


        }

        function cargarimgs(){
            controlador = 0
            if(controlador == 0){
                imgi = -1
                imgc = 0
                imgd = 1
            }
            for (var k = 0; k < window.json_galeriaHv.length; k++) {
                for (var i = 0; i < window.json_galeriaHv[k].images.length; i++) {
                    var n = window.json_galeriaHv[act].images.length,
                    arrimg = window.json_galeriaHv[act].images;
                    console.log(window.json_galeriaHv[act].images)
                    console.log(n)
                    insertarimgs(n, arrimg)
                    return;
                }
            }
        };

        function insertarimgs(n, i){
            $(imgContainer).html("")
            $(imgContainer).append('<div class="sta-modal-fad_popup_foto"' + 'style="background-image: url' + "('" + i.slice(imgc, imgc + 1) + "')" + '">'  + '</div>')
            $(imgContainer).append('<div class="sta-modal-fad_popup_foto"' + 'style="background-image: url' + "('" + i.slice(imgd, imgd + 1) + "')" + '">'  + '</div>')
            if(imgi == -1){
                $(imgContainer).append('<div class="sta-modal-fad_popup_foto"' + 'style="background-image: url' + "('" + i.slice(imgi) + "')" + '">'  + '</div>')
            }else{
                $(imgContainer).append('<div class="sta-modal-fad_popup_foto"' + 'style="background-image: url' + "('" + i.slice(imgi, imgi + n + 1) + "')" + '">'  + '</div>')
            }
            $(imgContainer).append('<div class="sta-modal-fad_popup_foto"' + 'style="display: none; background-image: url' + "('" + i.slice(imgd + 1, imgd + 2) + "')" + '">'  + '</div>')
            $(imgContainer).append('<div class="sta-modal-fad_popup_foto"' + 'style="display: none; background-image: url' + "('" + i.slice(imgi - 1, imgi) + "')" + '">'  + '</div>')

        };


        function animaciond(){
            var anim = imgContainer.animate([
                {transform: 'translateZ(-182px) rotateY(0)'},
                {transform: 'translateZ(0) rotateY(-120deg)'}
              ], 500);

              controlador++
              imgi++
              imgc++
              imgd++
              if(imgd == window.json_galeriaHv[act].images.length){
                  imgd = 0
              }
              console.log(controlador)
              if(controlador > window.json_galeriaHv[act].images.length - 1 || imgi > window.json_galeriaHv[act].images.length - 1 || imgd > window.json_galeriaHv[act].images.length - 1 || imgc > window.json_galeriaHv[act].images.length - 1){
                  controlador = 0
                  imgi = -1
                  imgc = 0
                  imgd = 1
              }

              anim.addEventListener('finish', function() {
                insertarimgs(n, window.json_galeriaHv[act].images)
              });
        }
        function animacioni(){
            var anim = imgContainer.animate([
                {transform: 'translateZ(-182px) rotateY(0)'},
                {transform: 'translateZ(0) rotateY(120deg)'}
              ], 500);

            controlador--
            imgi--
            imgc--
            imgd--
            if(-(imgi) == window.json_galeriaHv[act].images.length){
                imgi = 0
            }
            console.log(controlador)
            if(-(controlador) == window.json_galeriaHv[act].images.length){
                controlador = 0
                imgi = window.json_galeriaHv[act].images.length - 1
                imgc = 0
                imgd = window.json_galeriaHv[act].images.length - 2
            }
            if(imgc == -1){
                imgc = window.json_galeriaHv[act].images.length - 1
            } else if(imgd == -1){
                imgd = window.json_galeriaHv[act].images.length - 1
            }

              anim.addEventListener('finish', function() {
                insertarimgs(n, window.json_galeriaHv[act].images)
              });
        }
        $(buttonD).click(function(){
            
            animaciond()
            
        });
        $(buttonI).click(function(){
            
            animacioni()
            
        });
    };
})(document.querySelector('.sta-modal-fad_modal'), jQuery, hotusa());




(function(o, $, h){
    if(o){
        var boton = o.querySelectorAll('.sta-hoteles-fad_infocont'),
        hoteles = document.querySelectorAll('.sta-hoteles-fad_boxhotels'),
        fondo = o.querySelectorAll('.sta-hoteles-fad_fondo');
    
        for (var j = 0; j < hoteles.length; j++) {
            (function(h){
                boton[j].addEventListener('click', function(){
                    act = h;
                    if($(fondo[act]).hasClass('sta-disabled')){
                        $(fondo[act]).removeClass('sta-disabled');
                        $(fondo[act]).addClass('sta-visible');
                    }else{
                        $(fondo[act]).addClass('sta-disabled');
                        $(fondo[act]).removeClass('sta-visible');
                    }
                })
            })(j)
        };
    }


})(document.querySelector('.sta-hoteles-fad_max'), jQuery, hotusa());
