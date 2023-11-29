
import React, { useState, useEffect } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import '../index.css';
import axios from 'axios';

const Spinner = () => {
    // const [joke, setJoke] = useState("");

    // useEffect(() => {
    //     const fetchJokes = async () => {
    //         try {
    //             const response = await axios.get('https://official-joke-api.appspot.com/jokes/programming/random');
    //             const jokeData = response.data[0];
    //             setJoke(jokeData);
    //         } catch (error) {
    //             console.error('Error fetching jokes:', error);
    //         }
    //     };

    //     // Call the fetchJokes function when the component mounts
    //     fetchJokes();
    // }, []);

    return (
        <>
                {/* <div className='jokes'>
                <h1 className='colors'>{joke.setup}</h1>
                    <h3 className='colors'>{joke.punchline}</h3>
                    </div> */}
                <BallTriangle
                    height={100}
                    width={100}
                    radius={5}
                    color="red"
                    ariaLabel="ball-triangle-loading"
                    wrapperClass={"spinner"} // You can provide your CSS class here
                    wrapperStyle={{}} // You can provide your inline styles here
                    visible={true}
                />
        </>
    );
};

export default Spinner;
