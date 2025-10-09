import React, { useState, useEffect } from 'react';
import './RandomChess.css'; // Separate CSS file for isolated styling

function RandomChess() {
  const [board, setBoard] = useState([]);
  const [pieceImages, setPieceImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [currentTurn, setCurrentTurn] = useState('white');
  const [validMoves, setValidMoves] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'check', 'checkmate', 'stalemate'

  // Chess piece types
  const pieceTypes = ['pawn', 'rook', 'knight', 'bishop', 'queen', 'king'];

  // Initialize full chess board (8x8)
  const initializeBoard = () => {
    const newBoard = Array(8).fill(null).map(() => Array(8).fill(null));
    
    // Black pieces (top of board)
    newBoard[0] = [
      { type: 'rook', color: 'black' },
      { type: 'knight', color: 'black' },
      { type: 'bishop', color: 'black' },
      { type: 'queen', color: 'black' },
      { type: 'king', color: 'black' },
      { type: 'bishop', color: 'black' },
      { type: 'knight', color: 'black' },
      { type: 'rook', color: 'black' }
    ];
    
    // Black pawns
    for (let i = 0; i < 8; i++) {
      newBoard[1][i] = { type: 'pawn', color: 'black' };
    }
    
    // White pawns
    for (let i = 0; i < 8; i++) {
      newBoard[6][i] = { type: 'pawn', color: 'white' };
    }
    
    // White pieces (bottom of board)
    newBoard[7] = [
      { type: 'rook', color: 'white' },
      { type: 'knight', color: 'white' },
      { type: 'bishop', color: 'white' },
      { type: 'queen', color: 'white' },
      { type: 'king', color: 'white' },
      { type: 'bishop', color: 'white' },
      { type: 'knight', color: 'white' },
      { type: 'rook', color: 'white' }
    ];
    
    return newBoard;
  };

  // Fetch random images for each piece type
  const fetchRandomImages = async () => {
    try {
      setLoading(true);
      const images = {};
      
      // Fetch one unique image for each piece type
      const promises = pieceTypes.map((pieceType, index) =>
        fetch(`https://picsum.photos/60/60?random=${Date.now()}-${pieceType}-${index}`)
          .then(response => response.url)
      );
      
      const imageUrls = await Promise.all(promises);
      
      // Assign images to piece types
      pieceTypes.forEach((pieceType, index) => {
        images[pieceType] = imageUrls[index];
      });
      
      setPieceImages(images);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching random images:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setBoard(initializeBoard());
    fetchRandomImages();
  }, []);

  const renderSquare = (row, col) => {
    const piece = board[row] && board[row][col];
    const isLight = (row + col) % 2 === 0;
    const isSelected = selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col;
    const isValidMove = validMoves.some(([moveRow, moveCol]) => moveRow === row && moveCol === col);
    
    return (
      <div
        key={`${row}-${col}`}
        className={`chess-square ${isLight ? 'light' : 'dark'} ${isSelected ? 'selected' : ''} ${isValidMove ? 'valid-move' : ''}`}
        onClick={() => handleSquareClick(row, col)}
      >
        {piece && (
          <div className={`chess-piece ${piece.color}`}>
            {loading ? (
              <div className="loading-piece">🎲</div>
            ) : (
              <img
                src={pieceImages[piece.type]}
                alt={`${piece.color} ${piece.type}`}
                className="piece-image"
                title={`${piece.color} ${piece.type}`}
              />
            )}
          </div>
        )}
        {isValidMove && !piece && <div className="move-indicator"></div>}
      </div>
    );
  };

  // Check if a square is within board bounds
  const isValidSquare = (row, col) => {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  };

  // Get valid moves for a piece
  const getValidMoves = (piece, fromRow, fromCol) => {
    const moves = [];
    
    switch (piece.type) {
      case 'pawn':
        const direction = piece.color === 'white' ? -1 : 1;
        const startRow = piece.color === 'white' ? 6 : 1;
        
        // Move forward one square
        if (isValidSquare(fromRow + direction, fromCol) && !board[fromRow + direction][fromCol]) {
          moves.push([fromRow + direction, fromCol]);
          
          // Move forward two squares from starting position
          if (fromRow === startRow && !board[fromRow + 2 * direction][fromCol]) {
            moves.push([fromRow + 2 * direction, fromCol]);
          }
        }
        
        // Capture diagonally
        for (const colOffset of [-1, 1]) {
          const newRow = fromRow + direction;
          const newCol = fromCol + colOffset;
          if (isValidSquare(newRow, newCol)) {
            const targetPiece = board[newRow][newCol];
            if (targetPiece && targetPiece.color !== piece.color) {
              moves.push([newRow, newCol]);
            }
          }
        }
        break;

      case 'rook':
        // Horizontal and vertical moves
        const rookDirections = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        for (const [rowDir, colDir] of rookDirections) {
          for (let i = 1; i < 8; i++) {
            const newRow = fromRow + i * rowDir;
            const newCol = fromCol + i * colDir;
            if (!isValidSquare(newRow, newCol)) break;
            
            const targetPiece = board[newRow][newCol];
            if (!targetPiece) {
              moves.push([newRow, newCol]);
            } else {
              if (targetPiece.color !== piece.color) {
                moves.push([newRow, newCol]);
              }
              break;
            }
          }
        }
        break;

      case 'knight':
        const knightMoves = [
          [-2, -1], [-2, 1], [-1, -2], [-1, 2],
          [1, -2], [1, 2], [2, -1], [2, 1]
        ];
        for (const [rowOffset, colOffset] of knightMoves) {
          const newRow = fromRow + rowOffset;
          const newCol = fromCol + colOffset;
          if (isValidSquare(newRow, newCol)) {
            const targetPiece = board[newRow][newCol];
            if (!targetPiece || targetPiece.color !== piece.color) {
              moves.push([newRow, newCol]);
            }
          }
        }
        break;

      case 'bishop':
        // Diagonal moves
        const bishopDirections = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
        for (const [rowDir, colDir] of bishopDirections) {
          for (let i = 1; i < 8; i++) {
            const newRow = fromRow + i * rowDir;
            const newCol = fromCol + i * colDir;
            if (!isValidSquare(newRow, newCol)) break;
            
            const targetPiece = board[newRow][newCol];
            if (!targetPiece) {
              moves.push([newRow, newCol]);
            } else {
              if (targetPiece.color !== piece.color) {
                moves.push([newRow, newCol]);
              }
              break;
            }
          }
        }
        break;

      case 'queen':
        // Combination of rook and bishop moves
        const queenDirections = [
          [0, 1], [0, -1], [1, 0], [-1, 0],  // rook moves
          [1, 1], [1, -1], [-1, 1], [-1, -1] // bishop moves
        ];
        for (const [rowDir, colDir] of queenDirections) {
          for (let i = 1; i < 8; i++) {
            const newRow = fromRow + i * rowDir;
            const newCol = fromCol + i * colDir;
            if (!isValidSquare(newRow, newCol)) break;
            
            const targetPiece = board[newRow][newCol];
            if (!targetPiece) {
              moves.push([newRow, newCol]);
            } else {
              if (targetPiece.color !== piece.color) {
                moves.push([newRow, newCol]);
              }
              break;
            }
          }
        }
        break;

      case 'king':
        const kingMoves = [
          [-1, -1], [-1, 0], [-1, 1],
          [0, -1],           [0, 1],
          [1, -1],  [1, 0],  [1, 1]
        ];
        for (const [rowOffset, colOffset] of kingMoves) {
          const newRow = fromRow + rowOffset;
          const newCol = fromCol + colOffset;
          if (isValidSquare(newRow, newCol)) {
            const targetPiece = board[newRow][newCol];
            if (!targetPiece || targetPiece.color !== piece.color) {
              moves.push([newRow, newCol]);
            }
          }
        }
        break;
    }
    
    return moves;
  };

  // Handle square click
  const handleSquareClick = (row, col) => {
    if (loading) return;

    const clickedPiece = board[row][col];
    
    // If no piece is selected
    if (!selectedSquare) {
      if (clickedPiece && clickedPiece.color === currentTurn) {
        setSelectedSquare([row, col]);
        const moves = getValidMoves(clickedPiece, row, col);
        setValidMoves(moves);
      }
      return;
    }

    const [selectedRow, selectedCol] = selectedSquare;
    const selectedPiece = board[selectedRow][selectedCol];

    // If clicking on the same square, deselect
    if (selectedRow === row && selectedCol === col) {
      setSelectedSquare(null);
      setValidMoves([]);
      return;
    }

    // If clicking on a piece of the same color, select it instead
    if (clickedPiece && clickedPiece.color === currentTurn) {
      setSelectedSquare([row, col]);
      const moves = getValidMoves(clickedPiece, row, col);
      setValidMoves(moves);
      return;
    }

    // Check if the move is valid
    const isValidMove = validMoves.some(([moveRow, moveCol]) => moveRow === row && moveCol === col);
    
    if (isValidMove) {
      // Make the move
      const newBoard = board.map(row => [...row]);
      newBoard[row][col] = selectedPiece;
      newBoard[selectedRow][selectedCol] = null;
      
      setBoard(newBoard);
      setSelectedSquare(null);
      setValidMoves([]);
      setCurrentTurn(currentTurn === 'white' ? 'black' : 'white');
    } else {
      // Invalid move, deselect
      setSelectedSquare(null);
      setValidMoves([]);
    }
  };

  // Reset game
  const resetGame = () => {
    setBoard(initializeBoard());
    setSelectedSquare(null);
    setValidMoves([]);
    setCurrentTurn('white');
    setGameStatus('playing');
  };

  return (
    <div className="random-chess-container">
      <div className="random-chess-content">
        <h1 className="chess-title">Random Chess</h1>
        <p className="chess-description">
          Chess with random images for each piece type! Each piece type has its own unique image.
        </p>
        
        {/* Game Status */}
        <div className="game-status">
          <h3>Current Turn: <span className={`turn-indicator ${currentTurn}`}>{currentTurn.toUpperCase()}</span></h3>
        </div>
        
        {/* Piece Legend */}
        {!loading && (
          <div className="piece-legend">
            <h3>Piece Types:</h3>
            <div className="legend-grid">
              {pieceTypes.map(pieceType => (
                <div key={pieceType} className="legend-item">
                  <img 
                    src={pieceImages[pieceType]} 
                    alt={pieceType}
                    className="legend-image"
                  />
                  <span className="legend-label">{pieceType}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Chess Board */}
        <div className="chess-board-container">
          <div className="chess-board">
            {Array(8).fill(null).map((_, row) =>
              Array(8).fill(null).map((_, col) => renderSquare(row, col))
            )}
          </div>
        </div>
        
        {/* Controls */}
        <div className="chess-controls">
          <button onClick={fetchRandomImages} className="new-game-btn" disabled={loading}>
            {loading ? 'Loading...' : '🎲 New Random Piece Images'}
          </button>
          <button onClick={resetGame} className="reset-btn">
            🔄 Reset Game
          </button>
        </div>
        
        {/* Navigation back to home */}
        <div className="chess-navigation">
          <a href="#/" className="back-to-home">← Back to Home</a>
        </div>
      </div>
    </div>
  );
}

export default RandomChess;
