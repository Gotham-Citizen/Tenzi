export default function Die(props) {
    const diceLayout = {
  1: [
    [2, 2]                                      // 中心
  ],
  2: [
    [1, 1], [3, 3]                              // 左上、右下
  ],
  3: [
    [1, 1], [2, 2], [3, 3]                      // 左上、中心、右下
  ],
  4: [
    [1, 1], [1, 3],                             // 上两个
    [3, 1], [3, 3]                              // 下两个
  ],
  5: [
    [1, 1], [1, 3],                             // 上两个
    [2, 2],                                     // 中心
    [3, 1], [3, 3]                              // 下两个
  ],
  6: [
    [1, 1], [1, 3],                             // 上两个
    [2, 1], [2, 3],                             // 中间两个
    [3, 1], [3, 3]                              // 下两个
  ],
};
    const styles ={
        backgroundColor: props.isHeld ? "#59e391" : "white"
    }
    
    return (
        // <button onClick={props.handleClick} className={props.isHeld ? "hold" : ""}>{props.value}</button>
        <button 
            className="dice" 
            onClick={props.handleClick} 
            style={styles}
            aria-label={`Die with value ${props.value},
        ${props.isHeld ? "held" : "not held"}`}>
            {diceLayout[props.value].map(([row, col], i) => (
        <span
          key={i}
          className="dot"
          style={{ gridRow: row, gridColumn: col }}
        />
      ))}
        </button>
    )
}