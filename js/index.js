function resizeRows(width){

    var row=$('.row')
    var breaker='<div class="w-100"></div>'
    if(width<1000 ){
        console.log('bieetch')
        $('div.row div.col:first-child').after(breaker)

    }
    else if(width>=1000) {
        console.log('bieetch 2')

        row.find('.w-100').remove()

    }

}