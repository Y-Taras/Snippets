# minimax
```
function MINIMAX(N) is
begin
if N is deep enough then
return the estimated score of this leaf
else
Let N1, N2, .., Nm be the successors of N;
if N is a Min node then
return min{MINIMAX(N1), .., MINIMAX(Nm)}
else
return max{MINIMAX(N1), .., MINIMAX(Nm)}
end MINIMAX;
```
```
minimax(player,board)
    if(game over in current board position)
        return winner
    children = all legal moves for player from this board
    if(max's turn)
        return maximal score of calling minimax on all the children
    else (min's turn)
        return minimal score of calling minimax on all the children
```
