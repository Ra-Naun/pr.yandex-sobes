class WhiteNumber {
  static #number = 0

  static get next () {
    this.#number += 1;
    return this.#number
  }
}

class BlackNumber {
  static #number = 0

  static get next () {
    this.#number -= 1;
    return this.#number
  }
}

class MatrixCreator {
  constructor(n) {
    this.n =  n;
  }

  matrix = {};

  calcMatrix = () => {
    const size = 2 * this.n + 1;
    const objectMatrix = {};

    for (let i = 0; i < size; i++) {
      objectMatrix[i] = {}
      for (let j = 0; j < size; j++) {
        const isDiagonal = i === j;
        const isWhite = ((i + j) % 2);
        const value = isDiagonal ? 0 : isWhite && WhiteNumber.next;
        objectMatrix[i][j] = value;
      }
    }

    for (let j = 0; j < size; j++) {
      for (let i = 0; i < size; i++) {
        const isDiagonal = i === j;
        const isBlack = !((i + j) % 2);
        const value = isDiagonal ? 0 : isBlack && BlackNumber.next;
        value && (objectMatrix[i][j] = value);
      }
    }

    this.matrix = this.#getViewMatrix(objectMatrix);
  }

  #getViewMatrix = (objectMatrix) => {
    const size = 2 * this.n + 1;
    const matrix = [];

    for (let i = 0; i < size; i++) {
      const line = Object.values(objectMatrix[i]);
      matrix.push(line);
    }
    return matrix;
  }
}

const n = 7;

const matrixCreator = new MatrixCreator(n);

matrixCreator.calcMatrix();

console.log(matrixCreator.matrix);
