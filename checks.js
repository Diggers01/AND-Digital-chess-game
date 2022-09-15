// canMove("Rook", "A8", "B8");
const canMove = (piece, start, destination, colour = 'white') => {
    let startPositions = getNumberPosition(start)
    let destinationPositions = getNumberPosition(destination)
    if (!checkOnBoard(startPositions) || !checkOnBoard(destinationPositions)) {
        return 0;
    }
    switch (piece.toLowerCase()) {
        case "king":
            return line(startPositions, destinationPositions, 1) || diagonal(startPositions, destinationPositions, 1)
        case "rook":
            return line(startPositions, destinationPositions)
        case "bishop":
            return diagonal(startPositions, destinationPositions)
        case "queen":
            return line(startPositions, destinationPositions) || diagonal(startPositions, destinationPositions)
        case "knight":
            return lShape(startPositions, destinationPositions)
        case "pawn":
            return pawnMove(startPositions, destinationPositions, colour.toLowerCase())
    }
    return 'hello'
}

const checkOnBoard = (position) => {
    // position only has 2 ids ie A2, F5
    if (position.length > 2) {
        return false;
    }
    // checking if the position is outside the board
    for (let i = 0; i < position.length; i++) {
        if (!inRange(position[i], 1, 8)) {
            return false
        }
    }
    return true;
}

const inRange = (item, start, end) => {
    if (item >= start && item <= end) {
        return true
    }
    return false
}

// Getting the letter digit as it is easier to work with.
const getNumberPosition = (position) => {
    let positions = position.split('')
    for (let i = 0; i < positions.length; i++) {
        if (isNaN(positions[i])) {
            positions[i] = alphaVal(positions[i])
        }
    }
    return positions;
}

// Check if the diagonal position is correct
const diagonal = (start, destination, max = 8) => {
    let diff = getHorizontalVerticalDiff(start, destination)
    if (diff.horizontal != diff.vertical || (!isNaN(max) && diff.horizontal > max)) {
        return false
    }
    return true;
}

// Check if the row position is correct
const line = (start, destination, max = 8) => {
    if (start[0] != destination[0] && start[1] != destination[1]) {
        return false
    }
    let diff = getHorizontalVerticalDiff(start, destination)
    if (!isNaN(max) && (diff.horizontal > max || diff.vertical > max)) {
        return false
    }
    return true;
}

// Check if the knights L Shape position is correct
const lShape = (start, destination) => {
    let diff = getHorizontalVerticalDiff(start, destination)
    if ((diff.horizontal == 2 && diff.vertical == 1) || (diff.horizontal == 1 && diff.vertical == 2)) {
        return true;
    }
    return false;
}


// Check if the Pawn's position is possible
const pawnMove = (start, destination, colour = 'white') => {
    let diff = getHorizontalVerticalDiffWithDirection(start, destination)
    let direction = ''
    let exception = 2
    if (colour == 'black') {
        direction = '-'
        exception = 7
    }
    if (start[0] != destination[0]) {
        return false
    } else if (start[1] == (exception - parseInt(direction + '1'))) {
        return false
    } else if (start[1] == exception && (diff.vertical == parseInt(direction + '1') || diff.vertical == parseInt(direction + '2'))) {
        return true
    } else if (start[1] != exception && diff.vertical == parseInt(direction + '1')) {
        return true
    }
    return false
}

// Get the difference in value between the x and y axis of the positions
const getHorizontalVerticalDiff = (start, destination) => {
    return {
        'horizontal': Math.abs(destination[0] - start[0]),
        'vertical': Math.abs(destination[1] - start[1])
    }
}

// Get the difference in value between the x and y axis of the positions but keeping original direction
const getHorizontalVerticalDiffWithDirection = (start, destination) => {
    return {
        'horizontal': destination[0] - start[0],
        'vertical': destination[1] - start[1]
    }
}

// Get the number value for the letter inserted
const alphaVal = (letter) => {
    return letter.toLowerCase().charCodeAt(0) - 97 + 1
}