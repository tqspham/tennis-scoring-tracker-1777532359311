export function calculateScoreProgression(ballSequence: string): string[] {
  const scores: string[] = ['0-0'];
  let playerAPoints = 0;
  let playerBPoints = 0;

  for (const ball of ballSequence) {
    if (ball === 'A') {
      playerAPoints++;
    } else if (ball === 'B') {
      playerBPoints++;
    }

    const score = formatScore(playerAPoints, playerBPoints);

    // Check if game is won
    if (isGameWon(playerAPoints, playerBPoints)) {
      scores.push(score);
      break;
    }

    scores.push(score);
  }

  return scores;
}

function formatScore(playerAPoints: number, playerBPoints: number): string {
  // Both players have less than 3 points
  if (playerAPoints < 3 && playerBPoints < 3) {
    const pointMap: Record<number, string> = { 0: '0', 1: '15', 2: '30' };
    return `${pointMap[playerAPoints]}-${pointMap[playerBPoints]}`;
  }

  // At least one player has 3+ points
  if (playerAPoints >= 3 && playerBPoints >= 3) {
    const diff = playerAPoints - playerBPoints;

    if (diff === 0) {
      return 'Deuce';
    }
    if (diff === 1) {
      return 'Advantage A';
    }
    if (diff === -1) {
      return 'Advantage B';
    }
    if (diff >= 2) {
      return 'A wins the game';
    }
    if (diff <= -2) {
      return 'B wins the game';
    }
  }

  // One player has 3+ points, the other has less than 3
  if (playerAPoints >= 3) {
    return 'A wins the game';
  }
  if (playerBPoints >= 3) {
    return 'B wins the game';
  }

  return '0-0';
}

function isGameWon(playerAPoints: number, playerBPoints: number): boolean {
  // Regular win: one player has 4+ points and leads by at least 2
  if (playerAPoints >= 4 && playerAPoints - playerBPoints >= 2) {
    return true;
  }
  if (playerBPoints >= 4 && playerBPoints - playerAPoints >= 2) {
    return true;
  }

  return false;
}
