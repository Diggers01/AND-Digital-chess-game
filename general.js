let current = 'none';

$(document).ready(function() {
    $(document).on('keydown', function(e) {
        if (e.keyCode == 16) {
            current = 'start';
        } else if (e.keyCode == 32) {
            current = 'destination';
        } else if (e.keyCode == 13) {
            current = 'run';
        } else if (e.keyCode == 8) {
            current = 'reset';
        }
        simulateClick();
    })
    $('button').on('click', function() {
        simulateClick(this)
    })
    $('body').on('click', 'td', function() {
        switch (current) {
            case 'start':
                $(this).text($("td.start").text())
                $("td.start").text('')
                $("td").removeClass("start");
                $(this).addClass("start")
                break
            case 'destination':
                $("td").removeClass("destination");
                $(this).addClass("destination")
                break
        }
    })
    $('body').on('click', 'th.piece', function() {
        $('body').find('.start').html('<span>' + $(this).text() + '</span>')
        $('body').find('.start').data('piece', $(this).data('pieceinfo'))
    })
});

const simulateClick = (el) => {
    if (el !== undefined) {
        current = $(el).data('type')
    }
    if (current == 'pieceSelection') {
        $("th.piece").addClass("piece-box");
    } else if (current == 'reset') {
        $("td").removeClass("start");
        $("td").removeClass("destination");
        $("th.piece").removeClass("piece-box");
        $("td").text("");
    }
    if (current != 'pieceSelection') {
        $("th.piece").removeClass("piece-box");
    }
    if (current == 'run') {
        let start = $('body').find('.start').data('position');
        let destination = $('body').find('.destination').data('position');
        let pieceInfo = $('body').find('.start').data('piece').split('-');
        if (canMove(pieceInfo[1], start, destination, pieceInfo[0])) {
            let startPositions = getNumberPosition(start)
            let destinationPositions = getNumberPosition(destination)
            let diff = getHorizontalVerticalDiffWithDirection(startPositions, destinationPositions)
            $('body').find('.start span').css('top', getTopMove(diff.vertical, 1.5) + 'rem')
            $('body').find('.start span').css('left', getLeftMove(diff.horizontal, 0.5) + 'rem')
            setTimeout(function() {
                $('body').find('.destination').data('piece', $('body').find('.start').data('piece'))
                $('body').find('.destination').html('<span>' + $('body').find('.start').text() + '</span>')
                $("td.start").text("");
                $("td").removeClass("start");
                $('body').find('.destination').addClass('start')
                $("td").removeClass("destination");
                current = 'destination'
            }, 1000);
        } else {
            alert('This move is not possible')
            current = 'destination'
        }
    }
}

const getTopMove = (number, initial) => {
    if (number < 0) {
        return -(number * 3 - initial);
    } else if (number > 0) {
        return -(number * 3 - initial);
    }
    return initial
}

const getLeftMove = (number, initial) => {
    if (number < 0) {
        return ((number) * 3 + initial);
    } else if (number > 0) {
        return ((number) * 3 + initial);
    }
    return initial
}