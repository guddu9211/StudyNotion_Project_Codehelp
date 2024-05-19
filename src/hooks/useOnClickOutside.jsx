import  { useEffect } from 'react'

// this hook will help us to detect the clicks performed
// outside the component and calls the provided handler function
const useOnClickOutside = (ref, handler) => {

    useEffect( () => {
        // define the listener function to be called on click/touch events 
        const listener = (event) => {
            if(!ref.current || ref.current.contains(event.target)){
                return;
            }

            // otherwise, call the provided handler function
            handler(event);
        };

        // add event listeners for mouse button press and touct start events 
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        // clean up the clutter and remove the event listeners when component unmounts or when the ref/handler dependencies change
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        }
    }, [ref, handler])

}

export default useOnClickOutside