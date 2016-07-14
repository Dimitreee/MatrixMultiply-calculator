$(document).ready(function () {
    //_______________Clear_________________
    //clear all inputs
    $( '.clear' ).click(function () {
        $( 'input' ).val('');
    });

    var preveousRowsA=0;
    var preveousColumnsB=0;

    //____________________Replace______________________
    //replace the tables
    $( '.replace' ).click(function () {
        $( '.subDiv' ).html( $( '.firstMatrix>table' ) ) ;
        $( '.firstMatrix' ).html( $('.secondMatrix>table' ) );
        $( '.secondMatrix' ).html( $( '.subDiv>table' ) );
        $( '.summaryMatrix>table tr' ).remove();


        var countColumn= $( '.secondMatrix>table tr:first-of-type td' ).size();
        var countRow = $( '.secondMatrix>table tr' ).size();


        for ( var l=0 ; l<countRow; l++ ){
            $( '.summaryMatrix>table' ).append( '<tr></tr>' )
        }
        for ( var j=0 ; j<countColumn; j++ ){
            $( '.summaryMatrix>table tr' ).append( '<td><input type="text" placeholder="1.1"></td>' )
        }

    });
    //________________ON FOCUS COLOR CHANGE_________________________
    //change the color on focus
    $( 'div' ).on( 'focus', 'input[type!=radio]', function () {
        $( '.buttons-block' ).css( {backgroundColor: '#5199db'} )
    }).on( 'blur', 'input[type!=radio]', function () {
        $( '.buttons-block' ).css( {backgroundColor: '#bcbcbc'} )
    });
    //_______________________ADD ROWS AND COLUMNS___________________
    //adding the column on current table
    $('.add.column').click(function () {
        var countColumnA = $( '.firstMatrix>table tr:first-of-type td' ).size();
        var countColumnB = $( '.secondMatrix>table tr:first-of-type td' ).size();

        if ( $('input[type=radio][value=A]').prop('checked')){
            //count the number of td in table A
            //and if its == 0 , add the new row with td for the right structure
            // (i mean all td should be included in tr)
            if( countColumnA == 0 ){
                $('.firstMatrix>table')
                    .append( '<tr><td><input type="text" placeholder="1.1"></td></tr>' );
            }else{
                $('.firstMatrix>table tr')
                    .append( '<td><input type="text" placeholder="1.1"></td>' );
            }
        }else{
            //count the number of td in table B
            //and if its == 0 , add the new row with td for the right structure
            // (i mean, all td should be included in tr)
            if( countColumnB == 0 ){
                $('.secondMatrix>table')
                    .append( '<tr><td><input type="text" placeholder="1.1"></td></tr>' );
            }else{
                $('.secondMatrix>table tr')
                    .append( '<td><input type="text" placeholder="1.1"></td>' );
            }
        }
    });
    //adding the row on current table
    $( '.add.line' ).click(function () {
        var countrowA = $( '.firstMatrix>table tr:first-of-type td' ).size();
        var countrowB = $( '.secondMatrix>table tr:first-of-type td' ).size();

        if ( $('input[type=radio][value=A]').prop('checked')){
            if( countrowA == 0 ){
                $('.firstMatrix>table')
                    .append( '<tr><td><input type="text" placeholder="1.1"></td></tr>' );
            }else{
                $('.firstMatrix>table')
                    .append( '<tr></tr>' );
            }
            for( var i=0; i < countrowA; i++){
                $( '.firstMatrix>table tr:last-of-type' )
                    .append( '<td><input type="text" placeholder="1.1"></td>' );
            }
        }else{
            if( countrowB == 0 ){
                $('.secondMatrix>table')
                    .append( '<tr><td><input type="text" placeholder="1.1"></td></tr>' );
            }else{
                $('.secondMatrix>table')
                    .append( '<tr></tr>' );
            }
            for( var i=0; i < countrowB; i++){
                $( '.secondMatrix>table tr:last-of-type' )
                    .append( '<td><input type="text" placeholder="1.1"></td>' );
            }
        }
    });
    //_______________________RESET BUTTON_______________
    //delete all columns and rows
    $( '.reset' ).click(function () {
        $( '.firstMatrix>Table tr' ).remove();
        $( '.secondMatrix>Table tr' ).remove();
        $( '.summaryMatrix>Table tr' ).remove();
    });


    //_______________________DELETE BUTTONS______________________
    //Delete the column on current table
    $('.delete.column').click(function () {
        if ( $( 'input[type=radio][value=A]' ).prop( 'checked' ) ) {
            $('.firstMatrix>table tr td:last-of-type').remove();
        } else {
            $('.secondMatrix>table tr td:last-of-type').remove();
        }
    });
    //Delete the row on current table
    $('.delete.line').click(function () {
        if ( $( 'input[type=radio][value=A]' ).prop( 'checked' ) ) {
            $('.firstMatrix>table tr:last-of-type').remove();
        } else {
            $('.secondMatrix>table tr:last-of-type').remove();
        }
    });

    //__________________________LIMITATION_________________________
    // set the limitation leaning on (A columns)==(B rows) rule
    var limitation = 0;

    $( '.add, .delete' ).on( 'click keydown', function () {
        var currentColumnsA = ( $( '.firstMatrix>table tr:first-of-type td' ) ).size();
        var currentrowsB = ( $( '.secondMatrix>table tr' ) ).size();

        if ( currentColumnsA == currentrowsB){
            limitation = 1
        }else{
            limitation = 0
        }
    });
    //allert of vialation of rule LIMITATION
    $( '.button' ).on( 'click keydown' ,function () {
        if( limitation == 0 ){
            $( '.buttons-block' ).css({backgroundColor: '#f6c1c0'});
            $( '.warning' ).addClass( 'visible' );
        }else{
            $( '.buttons-block' ).css({backgroundColor: '#bcbcbc'});    
            $( '.warning' ).removeClass( 'visible' );
        }
    });


    //_______________________DYNAMICAL WATCHER ON A&B MATRIX TO SET SIZE_______________________
    //_______________________OF SUMMARY MATRIX__________________
    // add the columns and rows dynamically at the summary matrix
    $('.buttons-block button.add').on( 'click keydown', function (preveousRowsA, preveousColumnsB) {
        preveousRowsA =  $( '.firstMatrix>table tr' ).size();
        preveousColumnsB = $( '.secondMatrix>table tr:first-of-type td' ).size();

        var summaryRowsS = $('.summaryMatrix>table tr' ).size();
        var summaryColumnS = $( '.summaryMatrix>table tr:first-of-type td' ).size();

        if( preveousRowsA > summaryRowsS ){
            $( '.summaryMatrix>table' ).append( '<tr></tr>' );

            for( var i=0; i < preveousColumnsB; i++ ){
                $( '.summaryMatrix>table tr:last-of-type' )
                    .append( '<td><input type="text" placeholder="1.1 " value=""></td>' );
            }
        }else if ( preveousRowsA < summaryRowsS ){
            return;
        }else if ( preveousColumnsB > summaryColumnS){
            $( '.summaryMatrix>table tr' )
                .append( '<td><input type="text" placeholder="1.1 " value=""></td>' );
        }
    });
    // delete the columns and rows dynamically from the summary matrix
    $('.buttons-block button.delete').on( 'click keydown', function (preveousRowsB, preveousColumnsB) {
        var summaryRowsS = $('.summaryMatrix>table tr' ).size();
        var summaryColumnS = $( '.summaryMatrix>table tr:first-of-type td' ).size();
        var currentRowsB = $( '.secondMatrix>table tr' ).size();
        var currentColumnsB = $( '.secondMatrix>table tr:first-of-type td' ).size();

        if( currentColumnsB < summaryColumnS){
            $('.summaryMatrix>table tr td:last-of-type').remove();
        }else if ( currentRowsB < summaryRowsS){
            $('.summaryMatrix tr:last-of-type').remove();
        }
    });


    //____________________SUB-BUTONS___________________
    $( '.buttons-block' ).hover(function () {
        $( '.example,.construction,.reset' ).css( { opacity: "1" } )
    },function () {
        $( '.example,.construction,.reset' ).css( { opacity: "0" } )
    });


    //____________________EXAMPLE BUTTONS_______________
    //add the values on all input's to example the working algorithm
    $( '.example' ).click(function () {
        var aCellNumber = ( $( '.firstMatrix>table tr td' ) ).size();
        var bCellNumber = ( $( '.secondMatrix>table tr td' ) ).size();

        for( var i=0; i<aCellNumber; i++ ){
            $( '.firstMatrix>table tr td input' ).val(i);
        }
        for( var j=0; j<bCellNumber; j++ ){
            $( '.secondMatrix>table tr td input' ).val(j);
        }

    });


    //____________________MULTIPLY-FUNCTION_____________________
    //function to multiply matrixA*matrixB
    // (to be honest it should be possible not without google)
    function Composition( matrixA, matrixB ) {
        var heightA = matrixA.length,   //matrixA height
            widthA = matrixA[0].length, //matrixA width
            heightB = matrixB.length,   //matrixB height
            widthB = matrixB[0].length, //matrixB width
            matrixC = [];

        if( widthA != heightB ){
            return false;               //inspection to a rule
        }else{
            for ( var i=0; i<heightA; i++ ){
                matrixC[i]=[];          //setting summaryMatrix(MatrixC) height
            }                           //depending on a matrixA height
            for ( var k=0; k<widthB; k++ ){
                for ( i=0; i<heightA; i++ ){
                    var t=0;
                    for ( var j=0; j<heightB; j++ ){
                        t+= matrixA[i][j]*matrixB[j][k];//multiplication each matrixA[i][j]
                        matrixC[i][k] = t;              //element with each matrixB[j][k] element,
                    }                                   //and placing this on each matrixC i-row on k-position
                }
            }
            return matrixC;
        }
    };

    //_____________________MATRIX-TO-ARRAY-FUNCTION_____________________
    //simple function which joining each elemnt of elemnt to get the 'string' value,
    // then it split current string to get the array
    function arrayConvert(matrixC) {
        return matrixC.join().split(',');
    };

    //________________MULTIPLY-BUTTON_______________
    //onclick multiply
    $( '.multiply.button' ).click(function () {
        var c = $( '.firstMatrix>table tr:first-of-type td' ).size();
        var h = $( '.secondMatrix>table tr:first-of-type td' ).size();
        var matrixC=[];

        //get the values of A and B table on array's
        var  stringArrayA = $( '.firstMatrix>table tr td input' ).map(function () {
            return $(this).val();
        }).get();

        var stringArrayB = $( '.secondMatrix>table tr td input' ).map(function () {
            return $(this).val();
        }).get();

        //creating matrix based on one-dimensional array's
        var matrixA = [];
        while( stringArrayA[0] ){
            matrixA.push( stringArrayA.splice(0,c) )
        }
        var matrixB = [];
        while( stringArrayB[0] ){
            matrixB.push( stringArrayB.splice(0,h) )
        }

        //multiply matrix
        matrixC = ( Composition(matrixA, matrixB) );

        //convert to an array
        matrixC = ( arrayConvert(matrixC) );
        console.log(matrixC);

        //set the array data to inputs from summaryMatrix
        i=0;
        $( '.summaryMatrix>table tr td input' ).each(function (i) {
            $(this).val(matrixC[i]);
            return i++;
        });

    });

});

