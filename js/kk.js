$(document).ready(function() {

    var knots = [
        {
            name: 'Salamon',
            factors: [7.1053],
            image: 'salamon.jpg'
        },
        {
            name: 'Snake Trail',
            factors: [7.9344, 23.9344],
            image: 'snake_trail.jpg'
        },
    ];

    $('#knotCarousel').find('div.carousel-inner').html('');
    $.each(knots, function(index, value) {
    factors = [];
    $.each(value.factors, function(i, v) {
        var factor = $('<input>').attr({
        'type': 'hidden',
        'name': 'factor',
        'value': v
        })
        factors.push(factor);
    });


    var html=  $('<div>').attr({
        'class': 'carousel-item'
    }).append(
        $('<img>').attr({
        'class': 'd-block w-100',
        'src': 'img/'+value.image,
        'alt': value.name
        })
        ).append(
            factors
        ).append(
            $('<div>').attr({
                'class': 'carousel-caption d-none d-md-block'
            }).append(
                $('<h3>').append(value.name)
        )
    );
    $('#knotCarousel').find('div.carousel-inner').append(html);
    });

    $('#knotCarousel').find('div.carousel-item').first().addClass('active');

    $('#length').change(function(e){
        calcLength();
    }); 

    $('#knotCarousel').on('slide.bs.carousel', function () {
        displayLoader();
    });

    $('#knotCarousel').on('slid.bs.carousel', function () {
        calcLength();
    });

    function calcLength() {
        $('div.results').html('');
        var length = $('#length').val();
        if ( length == 0 ) {
            $('div.results').append('<span class="badge badge-warning">Bitte die gewünschte Länge angeben</span>&nbsp;');
        } else {
            $.each(factors, function(index, value){
                var result = length * value.value;
                console.log(length);
                console.log(value.value);
                $('div.results').append('<span class="badge badge-primary">'+result.toFixed(1)+'</span>&nbsp;');
            });
        }
        var factors = $('div.carousel-inner').find('div.active').find('input[name="factor"]');
        console.log(factors);
    }

    function displayLoader() {
        $('div.results').html('<span class="loader"></span>');
    }
});

