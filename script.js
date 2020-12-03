
var dimention = "";
var currentChoose = "";
var humanPlay = true;
// เลือก dimention
function selectchange() {
  dimention = document.getElementById("dimention").value;
  const ticTacToeGame = new TicTacToeGame();
  ticTacToeGame.start();
}

function TicTacToeGame() {
  currentid = "";
  board = new Board();
  humanPlayer = new HumanPlayer(board);
  computerPlayer = new ComputerPlayer(board);
  let turn = 0;
  this.start = function () {
    // change size container
    var DivContainer = document.getElementById("container");
    var width = dimention * 130;
    DivContainer.style = "width:" + width + "px";
    var DivContent = document.getElementById("content");
    DivContent.innerHTML = "";
    for (var i = 0; i < dimention; i++) {
      var newDiv = document.createElement('div');
      if (i != dimention - 1)
        newDiv.className = "row border-b";
      else
        newDiv.className = "row";
      for (var j = 0; j < dimention; j++) {
        var newCol = document.createElement('div');
        newCol.id = "col" + i.toString() + j.toString();
        if (j != dimention - 1)
          newCol.className = "col border-r";
        else
          newCol.className = "col";
        newDiv.appendChild(newCol);
      }
      DivContent.appendChild(newDiv);

      
      board = new Board();
      humanPlayer = new HumanPlayer(board);
      computerPlayer = new ComputerPlayer(board);
      observer = new MutationObserver(() => takeTurn());
    }


    config = { childList: true };
    board.positions.forEach((el) => observer.observe(el, config));
    takeTurn();
  }

  function takeTurn() {
    if (board.checkForWinner()) {
      return;
    }

    if (turn % 2 === 0) {
      humanPlayer.takeTurn();
    } else {
      computerPlayer.takeTurn();
    }

    turn++;
  };
}

function Board() {

  this.positions = Array.from(document.querySelectorAll('.col'));

  this.checkForWinner = function () {
    // พิจารณา x,y
    var res = currentChoose.substring(3, 5);
    var x = res.substring(0, 1);
    var y = res.substring(1, 2);
    var status = false;
    var label = "X";

    if (humanPlay == false)
      label = "O";
    for (i = 0; i < dimention; i++) {
      var key = "col" + x.toString() + i.toString();
      var value = document.getElementById(key);
      if (value == null) {
        status = false;
        break;

      }
      if (value.innerHTML != label) {
        status = false;
        break;

      }
      if (value.innerHTML == label) {
        status = true;

      }

    }

    if (status == false) {
      for (i = 0; i < dimention; i++) {
        var key = "col" + i.toString() + y.toString();
        var value = document.getElementById(key);
        if (value == null) {
          status = false;
          break;

        }
        if (value.innerHTML != label) {
          status = false;
          break;

        }
        if (value.innerHTML == label) {
          status = true;

        }

      }
    }

    if (status == false) {
      for (i = 0; i < dimention; i++) {
        var key = "col" + i.toString() + i.toString();
        var value = document.getElementById(key);
        if (value == null) {
          status = false;
          break;

        }
        if (value.innerHTML != label) {
          status = false;
          break;

        }
        if (value.innerHTML == label) {
          status = true;

        }

      }
    }


    if (status == false) {
      for (i = 0; i < dimention; i++) {
        var key = "col" + i.toString() + (dimention - i - 1).toString();
        var value = document.getElementById(key);
        if (value == null) {
          status = false;
          break;

        }
        if (value.innerHTML != label) {
          status = false;
          break;

        }
        if (value.innerHTML == label) {
          status = true;

        }

      }
    }

    if (status == true) {
      if (humanPlay == true)
        alert('Human win');
      else
        alert('Machine win');
      return true;
    }


    return false;
  }
}

function ComputerPlayer(board) {
  this.takeTurn = function () {
    humanPlay = false;
    let availablePositions = board.positions.filter((p) => p.innerText === '');
    const move = Math.floor(Math.random() * (availablePositions.length - 0));
    availablePositions[move].innerText = 'O';
    currentChoose = availablePositions[move].id;

  }
}

function HumanPlayer(board) {
  this.takeTurn = function () {
    board.positions.forEach(el =>
      el.addEventListener('click', handleTurnTaken));
  }

  function handleTurnTaken(event) {
    if (event.target.innerText == 'O')
      return;
    event.target.innerText = 'X';
    currentChoose = event.target.id;
    humanPlay = true;
    board.positions
      .forEach(el => el.removeEventListener('click', handleTurnTaken));
  }
}
