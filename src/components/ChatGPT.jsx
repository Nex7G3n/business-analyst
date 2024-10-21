import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Actions } from "./Actions";
import { Separator } from "@radix-ui/react-separator";

export const ChatGpt = ({ ratios, balance, news, actions }) => {
    const [interpretation, setInterpretation] = useState(null);
    const [error, setError] = useState(null);

    console.log("Ratios", ratios);
    console.log("Balance", balance);
    console.log("News", news);
    console.log("Actions", actions);

    
    useEffect(() => {
        if (!!ratios && !!balance && !!news && !!actions) {
            console.log("Se puede realizar la operación");
            async function openGPT() {
                console.log(apiKey);
                try {
                    const response = await fetch('https://api.openai.com/v1/chat/completions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${apiKey}`
                        },
                        body: JSON.stringify({
                            model: 'gpt-4o-mini',
                            messages: [
                                {
                                    role: 'system',
                                    content: 'Eres un analista financiero experto. Dado los siguientes datos, debes hacer un análisis detallado de la empresa.'
                                },
                                {
                                    role: 'user',
                                    content: `
                                        Aquí tienes un informe financiero:
                                        - Balance: ${JSON.stringify(balance)}
                                        - Noticias relevantes: ${JSON.stringify(news)}
                                        - Acciones recientes: ${JSON.stringify(actions)}
                                        - Ratios financieros: ${JSON.stringify(ratios)}

                                        Realiza un análisis financiero detallado y proporciona una predicción clara en formato JSON con los siguientes campos:
                                        {
                                            "decision": "invertir" o "no invertir",
                                            "motivos": "explicación clara",
                                            "rentabilidad_esperada": "porcentaje",
                                            "tiempo_estimado_retorno": "meses",
                                            "analisis_rentabilidad": "análisis de márgenes y ROI",
                                            "tendencia_ventas": "tendencia de ventas en el tiempo",
                                            "analisis_deuda": "evaluación de la deuda y capacidad de pago",
                                            "proyecciones_dividendos": "proyección de dividendos futuros"
                                        }
                                        No incluyas recomendaciones para investigar más, solo el análisis solicitado, devuelveme solo un array con lo que te pedi, sin estilos, necesito un formato lo mas parecido a json posible.
                                    `
                                }
                            ]
                        })
                    });
                    const data = await response.json();
                    return data;
                } catch (err) {
                    console.error(err);
                    setError('Ocurrió un error al procesar la solicitud.');
                }
            }

            openGPT().then(response => {
                console.log(response);
                if (response && response.choices) {
                    // Limpiamos el contenido recibido para evitar errores de JSON
                    const rawContent = response.choices[0].message.content.trim();
                    console.log("Contenido recibido:", rawContent);
                    try {
                        const parsed = JSON.parse(rawContent);
                        setInterpretation(parsed);
                    } catch (e) {
                        console.error("Error al parsear el JSON:", e);
                        setError('Error al interpretar la respuesta. La respuesta no es un JSON válido.');
                    }
                } else {
                    setError('Error al interpretar la respuesta.');
                }
            });
        } else {
            console.log("No se puede realizar la operación");
        }
    }, [ratios, balance, news, actions]);

    return (
        <div>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gray-900 drop-shadow-lg">
              Interpretación
            </h1>
            <Separator />
            {error ? (
                <p>{error}</p>
            ) : interpretation ? (
                <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-lg">Categoría</TableHead>
                    <TableHead className="text-lg">Detalle</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold text-left">Decisión</TableCell>
                    <TableCell className="text-left">{interpretation.decision}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-left">Motivos</TableCell>
                    <TableCell className="text-left">{interpretation.motivos}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-left">Rentabilidad Esperada (%)</TableCell>
                    <TableCell className="text-left">{interpretation.rentabilidad_esperada}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-left">Tiempo Estimado de Retorno (meses)</TableCell>
                    <TableCell className="text-left">{interpretation.tiempo_estimado_retorno}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-left">Análisis de Rentabilidad</TableCell>
                    <TableCell className="text-left">{interpretation.analisis_rentabilidad}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-left">Tendencia de Ventas</TableCell>
                    <TableCell className="text-left">{interpretation.tendencia_ventas}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-left">Análisis de Deuda</TableCell>
                    <TableCell className="text-left">{interpretation.analisis_deuda}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-left">Proyecciones de Dividendos</TableCell>
                    <TableCell className="text-left">{interpretation.proyecciones_dividendos}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};
