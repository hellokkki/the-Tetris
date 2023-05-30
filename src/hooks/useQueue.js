import { useEffect, useState } from "react"
import { Queue } from "../logic/queue"


export const useQueue = ( size ) => {
    const [queue, setQueue] = useState(new Queue(size));

    return [queue, setQueue]
}