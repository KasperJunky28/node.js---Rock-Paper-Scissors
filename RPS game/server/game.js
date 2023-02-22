class rpsGame {
    constructor(p1,p2){
        this.players = [p1,p2];
        this.turns = [null,null];
        this.sendToPlayers('Game Starts!');
        this.players.forEach((player,idx) => {
            player.on('turn',(turn)=>{
                this.onTurn(idx,turn);
            })
        })
    }
    sendToPlayer(playerIndex, message){
        this.players[playerIndex].emit('message',message);
    }
    sendToPlayers(message){
        this.players.forEach((player) =>{
            player.emit('message',message)});
    }
    onTurn(playerIndex,turn){
        this.turns[playerIndex] = turn;
        this.sendToPlayer(playerIndex,`you selected ${turn}`);
        this.checkGameOver();
    }
    checkGameOver(){
        const turns = this.turns;
        if(turns[0] && turns[1]){
            this.sendToPlayers('Game over ' + turns.join(' : '));
            this.getGameResults();
            this.turns = [null,null];
            this.sendToPlayers('Next Round starts!')
        }
    }
    getGameResults(){
        const p1 = this.decodeTurn(this.turns[0]);
        const p2 = this.decodeTurn(this.turns[1]);
        const distance = (p2 -p1 + 3)%3;
        switch (distance){
            case 0:
                this.sendToPlayers('draw!');
                break;
            case 1:
                this.sendMessage(this.players[0],this.players[1]);
                break;
            case 2:
                this.sendMessage(this.players[1],this.players[0]);
                break;
        }
    }
    sendMessage(winner, loser){
        winner.emit('message','you won! :)');
        loser.emit('message','you lost :(');
    }

    decodeTurn(turn){
        switch (turn){
            case 'rock':
                return 0;
            case 'scissors':
                return 1;
            case 'paper':
                return 2;
            default:
                throw new Error(`could not decode turn ${turn}`);
        }
    }
}

module.exports = rpsGame;