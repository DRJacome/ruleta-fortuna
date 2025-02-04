import React, { useRef, useState } from "react";

function App() {
    const [ancho, setAncho] = useState(1);
    const [monedas, setMonedas] = useState(1);
    const [tiradas, setTiradas] = useState(1);
    const [premio, setPremio] = useState(
        "Selecciona la potencia con la que quieres lanzar la ruleta y ganar monedas."
    );
    const [rotacion, setRotacion] = useState(0);
    const [situacion, setSituacion] = useState(0);
    const xRoja = "./assets/x_roja.png";

    const barraRef = useRef(null);

    const lanzar = () => {
        if (barraRef.current) {
            setTiradas(tiradas - 1);
            barraRef.current.classList.toggle("paradaBarraPotencia");
            const potenciaSeleccionada = barraRef.current.getBoundingClientRect()
                .width;
            setAncho(potenciaSeleccionada);
            girarRuleta();
            setSituacion(1);
        }
    };
    
    const girarRuleta = () => {
        const rotacionAleatoria = Math.floor(Math.random() * 210) + 340;
        setPremio("Suerte...");
        setRotacion(rotacion + ancho + rotacionAleatoria);
    };

    const posicionTirada = () => {
        setSituacion(0);
        const gradosRotacion = ((rotacion % 360) + 360) % 360;

        switch (true) {
            case (gradosRotacion >= 0 && gradosRotacion <= 44) ||
                (gradosRotacion >= 180 && gradosRotacion <= 224):
                setPremio("Casilla de muerte. Has perdido!");
                setMonedas(0);
                setSituacion(2);
                break;
            case gradosRotacion >= 45 && gradosRotacion <= 90:
                setPremio(`Ganas 1 y sumas ${monedas + 1} monedas.`);
                setMonedas(monedas + 1);
                setTiradas(tiradas + 1);
                break;
            case gradosRotacion >= 91 && gradosRotacion <= 135:
                setPremio(`Doblas x2 y sumas ${monedas * 2} monedas.`);
                setMonedas(monedas * 2);
                setSituacion(2);
                break;
            case gradosRotacion >= 136 && gradosRotacion <= 179:
                setPremio(`Ganas 8 y sumas ${monedas + 8} monedas.`);
                setMonedas(monedas + 8);
                setTiradas(tiradas + 1);
                break;
            case gradosRotacion >= 225 && gradosRotacion <= 269:
                setPremio(`Ganas 5 y sumas ${monedas + 5} monedas.`);
                setMonedas(monedas + 5);
                setTiradas(tiradas + 1);
                break;
            case gradosRotacion >= 270 && gradosRotacion <= 314:
                setPremio(`Multiplicas x3 y sumas ${monedas * 3} monedas.`);
                setMonedas(monedas * 3);
                setSituacion(2);
                break;
            case gradosRotacion >= 315 && gradosRotacion <= 359:
                setPremio(`Ganas 2 y sumas ${monedas + 2} monedas.`);
                setMonedas(monedas + 2);
                setTiradas(tiradas + 1);
                break;
            default:
                setPremio(`Has ganado ${monedas}. Fin del juego.`);
                break;
        }
    };

    const reiniciar = () => {
        setMonedas(1);
        setTiradas(1);
        setPremio(
            "Selecciona la potencia con la que quieres lanzar la ruleta y ganar monedas."
        );
        setSituacion(0);
    };
    return (
        <>
            <body>
                <section>
                    <div className='monedas'>
                        {monedas === 0 ? (
                            <img src={xRoja} alt='X roja' />
                        ) : (
                            /* array.from() es una función de JS que permite convertir un elemento en un array */
                            Array.from({ length: monedas }, (_, index) => (
                                <img
                                    key={index}
                                    src='./assets/moneda.png'
                                    alt={`Moneda`}
                                />
                            ))
                        )}
                    </div>
                    <div className='tiradas'>
                        {Array.from({ length: tiradas }, (_, index) => (
                            <img
                                key={index}
                                src='./assets/ticket.png'
                                alt={`Ticket`}
                            />
                        ))}
                    </div>
                    <div className='titulo'>
                        <h1>Ruleta de la fortuna</h1>
                        <h3>
                            Empiezas con una moneda y un ticket de tirada. Las
                            casillas de color dan moneda y ticket; las blancas
                            sólo dan moneda.
                        </h3>
                    </div>
                    <div className='tablero'>
                        <div
                            className='ruleta'
                            style={{
                                backgroundImage: `url('./assets/ruleta.png')`,
                                transform: `rotate(${rotacion}deg)`,
                                transition:
                                    "transform 6s cubic-bezier(0.2, 0.8, 0.7, 0.99)",
                            }}
                            onTransitionEnd={posicionTirada}></div>
                        <div className='premio'>
                            <h3 className='letreroPremio'>{premio}</h3>
                        </div>
                        <div className='lanzador'>
                            {situacion === 0 && (
                                <div className='indicador'>
                                    <div
                                        className='indicadorPotencia'
                                        ref={barraRef}></div>
                                </div>
                            )}
                        </div>
                        <div className='barraInferior'>
                            {tiradas > 0 && (
                                <button className='lanzar' onClick={lanzar}>
                                    Lanzar
                                </button>
                            )}
                            {tiradas === 0 && (
                                <button
                                    className='reiniciar'
                                    onClick={reiniciar}>
                                    Reiniciar
                                </button>
                            )}
                            {situacion === 2 && (
                                <h1>
                                    No te quedan más tiradas. Has ganado{" "}
                                    {monedas} monedas.
                                </h1>
                            )}
                        </div>
                        <div className='marcador'>
                            <img
                                src='./assets/central.png'
                                alt='Logo central'
                            />
                        </div>
                    </div>
                </section>
            </body>
        </>
    );
}

export default App;
