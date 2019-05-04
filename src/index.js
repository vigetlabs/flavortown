import React from 'react';
import {render, Box} from 'ink';
import { useFile, useRange } from './hooks'

function Renderer({ frames }) {
  let count = useRange(0, frames, 50)
  let content = useFile(`morph-${count}.txt`)

  return (
    <Box flexDirection="column">
      {content.trim()}
      Rendered by o° Viget
    </Box>
  );
}

render(<Renderer frames={Number(process.argv[2]) - 1} />);