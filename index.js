class Player{
    constructor(){
        this.cords = {
            x: 10,
            y: 10
        };
    }

    checkBorder(){
        if (this.cords.y == 0){
            return false;
        }
        else return true;
    }
    moveUp(){
        if (this.checkBorder() == true){
            this.cords.y -= 10;
        }
    }
    moveDown(){
        this.cords.y += 10;
    }
    moveRight(){
        this.cords.x += 10;
    }
    moveLeft(){
        this.cords.x -= 10;
    }

}
//Start
const canvas = document.getElementById('maze');
const ctx = canvas.getContext('2d');
const player = new Player();
const mazeV = display(maze(25,25));

draw();
playerControls();

//Functions:
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawGrid();
    drawMaze();
    drawPlayer();
    drawEndPoint();
}

function drawGrid(){
    ctx.fillStyle = 'rgb(192, 192, 192)';
    ctx.fillRect(0,0,510,510);

    for(let x = 0; x < 510; x += 10){
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 510);
    }
    for(let y = 0; y < 510; y += 10){
        ctx.moveTo(0, y);
        ctx.lineTo(510, y);
    }
    ctx.strokeStyle = "#ddd";
    ctx.stroke();
}

function drawMaze(){
    let CordY = 0;

    mazeV.forEach(element => {
        let CordX = 0;

        element.forEach(item =>{
            if(item == true){
                ctx.fillStyle = 'rgb(0, 0, 0)';
                ctx.fillRect(CordX, CordY, 10, 10);
            }
            CordX += 10;
        })
        CordY += 10;
    });

}

function drawPlayer(){
    ctx.fillStyle = 'rgb(255, 0, 0)';
    ctx.fillRect(player.cords.x, player.cords.y, 10, 10);
}

function drawEndPoint(){
    ctx.fillStyle = 'rgb(0, 200, 0)';
    ctx.fillRect(500, 490, 10, 10);
}

function playerControls(){
    document.addEventListener('keydown', function(e){
        switch(e.keyCode){
            case 37:
                if(checkMove("left") == true){
                    player.moveLeft();
                }
                draw();
                break;
            case 38:
                if(checkMove("up") == true){
                    player.moveUp();
                }
                draw();
                break;
            case 39:
                if(checkMove("right") == true){
                    player.moveRight();
                }
                draw();
                break;
            case 40:
                if(checkMove("down") == true){
                    player.moveDown();
                }
                draw();
                break;
        }
    });
}

function checkMove(direction){
    let x = (player.cords.x / 10);
    let y = (player.cords.y / 10);

    switch(direction){
        case "left":
            let left = x - 1;

            if (mazeV[y][left] == true){
                return false;
            }
            else return true;

        case "right":
            let right = x + 1;

            if (mazeV[y][right] == true){
                return false;
            }
            else return true;
            
        case "up":
            let up = y - 1;

            if (mazeV[up][x] == true){
                return false;
            }
            else return true;

        case "down":
            let down = y + 1;
            
            if (mazeV[down][x] == true){
                return false;
            }
            else return true;
    }
}

function maze(x,y) { // Maze generation algorith from http://rosettacode.org/wiki/Maze_generation#JavaScript
	var n=x*y-1;
	if (n<0) {alert("illegal maze dimensions");return;}
	var horiz =[]; 
		for (var j= 0; j<x+1; j++) horiz[j]= [],
	verti =[]; 
		for (var j= 0; j<x+1; j++) verti[j]= [],
		
	here = [Math.floor(Math.random()*x), Math.floor(Math.random()*y)],
	path = [here],
	unvisited = [];
	for (var j = 0; j<x+2; j++) {
		unvisited[j] = [];
		for (var k= 0; k<y+1; k++)
			unvisited[j].push(j>0 && j<x+1 && k>0 && (j != here[0]+1 || k != here[1]+1));
	}
	while (0<n) {
		var potential = [[here[0]+1, here[1]], [here[0],here[1]+1],
		    [here[0]-1, here[1]], [here[0],here[1]-1]];
		var neighbors = [];
		for (var j = 0; j < 4; j++)
			if (unvisited[potential[j][0]+1][potential[j][1]+1])
				neighbors.push(potential[j]);
		if (neighbors.length) {
			n = n-1;
			next= neighbors[Math.floor(Math.random()*neighbors.length)];
			unvisited[next[0]+1][next[1]+1]= false;
			if (next[0] == here[0])
				horiz[next[0]][(next[1]+here[1]-1)/2]= true;
			else 
				verti[(next[0]+here[0]-1)/2][next[1]]= true;
			path.push(here = next);
		} else 
			here = path.pop();
	}
	return {x: x, y: y, horiz: horiz, verti: verti};
}

function display(m) {
	var text= [];

	for (var j= 0; j<m.x*2+1; j++) {
		var line= [];
		if (0 == j%2)
			for (var k=0; k<m.y*2+1; k++)
				if (0 == k%2) 
					line[k]= true;
				else
					if (j>0 && m.verti[j/2-1][Math.floor(k/2)])
						line[k]= false;
					else
						line[k]= true;
		else
			for (var k=0; k<m.y*2+1; k++)
				if (0 == k%2)
					if (k>0 && m.horiz[(j-1)/2][k/2-1])
						line[k]= false;
					else
						line[k]= true;
				else
					line[k]= false;
		if (0 == j) line[1]= false;
		if (m.x*2-1 == j) line[2*m.y]= false;

		text.push(line);
	}
	console.log(text);
	return text;
}