"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

const planets = [
  { name: "Mercurio", image: "/img/mercurio.png?height=300&width=300" },
  { name: "Venus", image: "/img/venus.png?height=300&width=300" },
  { name: "Tierra", image: "/img/tierra.png?height=300&width=300" },
  { name: "Marte", image: "/img/marte.png?height=300&width=300" },
  { name: "Júpiter", image: "/img/jupiter.png?height=300&width=300" },
  { name: "Saturno", image: "/img/saturno.png?height=300&width=300" },
  { name: "Urano", image: "/img/urano.png?height=300&width=300" },
  { name: "Neptuno", image: "/img/neptuno.png?height=300&width=300" },
];

export default function Component() {
  const [currentPlanet, setCurrentPlanet] = useState(planets[0]);
  const [score, setScore] = useState(0);
  const [totalGuesses, setTotalGuesses] = useState(0);
  const [selectedPlanet, setSelectedPlanet] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [cropPositions, setCropPositions] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [radioDisabled, setRadioDisabled] = useState(false);

  useEffect(() => {
    newRound();
  }, []);

  const newRound = () => {
    const randomPlanet = planets[Math.floor(Math.random() * planets.length)];
    setCurrentPlanet(randomPlanet);
    setSelectedPlanet("");
    setShowResult(false);
    setRadioDisabled(false);

    const gridSize = 3;
    const cellSize = 100;
    const positions = [];

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        positions.push({ x: j * cellSize, y: i * cellSize });
      }
    }

    const shuffledPositions = positions
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    setCropPositions(shuffledPositions);
  };

  const handleGuess = () => {
    setTotalGuesses(totalGuesses + 1);
    if (selectedPlanet === currentPlanet.name) {
      setScore(score + 1);
    }
    setShowResult(true);
    setRadioDisabled(true);
  };

  return (
    <Card className="w-screen h-screen max-w-none overflow-auto bg-gradient-to-b from-green-200 to-blue-200 text-gray-800 shadow-xl">
      <header className="w-full p-8 flex justify-between items-center">
        <Image
          src="/img/ipn.png?height=80&width=80"
          alt="Left header image"
          width={150}
          height={150}
        />
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black-600">
            Laboratorio de Cómputo Inteligente
          </h1>
          <h2 className="text-xl font-semibold text-black-500">UPIIZ-IPN</h2>
        </div>
        <Image
          src="/img/upiiz.png?height=80&width=80"
          alt="Right header image"
          width={120}
          height={120}
        />
      </header>
      <CardHeader className="pb-8">
        <CardTitle className="text-3xl font-bold text-center text-orange-500">
          ¡Adivina el Planeta! 🪐
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <div className="flex justify-center space-x-4 mt-2">
          {cropPositions.map((position, index) => (
            <div
              key={index}
              className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 overflow-hidden rounded-full border-4 border-orange-400 shadow-lg transform hover:scale-105 transition-transform"
            >
              <div
                className="absolute w-[300px] h-[300px]"
                style={{
                  backgroundImage: `url(${currentPlanet.image})`,
                  backgroundPosition: `-${position.x}px -${position.y}px`,
                  backgroundSize: "300px 300px",
                }}
              />
            </div>
          ))}
        </div>
        <RadioGroup
          value={selectedPlanet}
          onValueChange={setSelectedPlanet}
          disabled={radioDisabled}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl"
        >
          {planets.map((planet) => (
            <div
              key={planet.name}
              className="flex items-center space-x-2 bg-white bg-opacity-50 rounded-lg p-3 transition-colors hover:bg-opacity-70"
            >
              <RadioGroupItem
                value={planet.name}
                id={planet.name}
                disabled={radioDisabled}
                className="text-orange-500"
              />
              <Label
                htmlFor={planet.name}
                className={`text-sm sm:text-base ${radioDisabled ? "opacity-50" : ""}`}
              >
                {planet.name}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <div className="flex flex-col items-center space-y-4">
          <Button
            onClick={handleGuess}
            disabled={!selectedPlanet || showResult || radioDisabled}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full text-lg transform hover:scale-105 transition-transform"
          >
            ¡Adivina!
          </Button>
          {showResult && (
            <div className="text-center">
              <p
                className={`text-xl font-bold ${selectedPlanet === currentPlanet.name ? "text-green-600" : "text-red-500"}`}
              >
                {selectedPlanet === currentPlanet.name
                  ? "¡Correcto! 🌟"
                  : `Incorrecto 😔 Era ${currentPlanet.name}.`}
              </p>
              <Button
                onClick={newRound}
                variant="outline"
                className="mt-3 bg-transparent border-2 border-orange-500 text-orange-600 hover:bg-orange-100 font-bold py-2 px-6 rounded-full text-base transform hover:scale-105 transition-transform"
              >
                Siguiente Planeta
              </Button>
            </div>
          )}
          <p className="text-lg font-bold text-orange-600">
            Puntuación: {score} / {totalGuesses}
          </p>
        </div>
        <AIExplanationDialog />
      </CardContent>
    </Card>
  );
}

function AIExplanationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-transparent border-2 border-orange-500 text-orange-600 hover:bg-orange-100 font-bold py-2 px-4 sm:px-6 rounded-full text-sm sm:text-base transform hover:scale-105 transition-transform"
        >
          ¿Cómo es esto como IA?
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-b from-green-200 to-blue-200 text-gray-800 max-w-[90vw] sm:max-w-[80vw] md:max-w-[60vw] lg:max-w-[50vw]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-orange-500">
            Cómo funciona la Clasificación de IA
          </DialogTitle>
          <DialogDescription className="text-lg text-gray-700">
            Este juego es similar a cómo la IA clasifica imágenes. Así es cómo:
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-gray-700">
          <p>
            1.{" "}
            <strong className="text-orange-600">
              Aprendiendo de Ejemplos:
            </strong>{" "}
            Así como tú aprendes a reconocer planetas jugando este juego, la IA
            aprende mirando muchas imágenes de ejemplo.
          </p>
          <p>
            2.{" "}
            <strong className="text-orange-600">Usando Características:</strong>{" "}
            Las tres partes de la imagen que ves son como "características" que
            la IA mira para tomar una decisión.
          </p>
          <p>
            3.{" "}
            <strong className="text-orange-600">Haciendo Predicciones:</strong>{" "}
            Cuando adivinas el planeta, estás haciendo lo que hace la IA - hacer
            una predicción basada en la información que tienes.
          </p>
          <p>
            4.{" "}
            <strong className="text-orange-600">
              Mejorando con la Práctica:
            </strong>{" "}
            Cuanto más juegas, mejor te vuelves. De manera similar, la IA mejora
            su precisión a medida que procesa más datos.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
