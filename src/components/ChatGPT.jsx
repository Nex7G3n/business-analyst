import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Separator } from "@radix-ui/react-separator";

export const ChatGpt = ({ ratios, balance, news, actions }) => {
    const [interpretation, setInterpretation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!!ratios && !!balance && !!news && !!actions) {
            setLoading(true);
            setError(null);
            async function openGPT() {
                try {
                    const response = await fetch("https://api.openai.com/v1/chat/completions", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${apiKey}`,
                        },
                        body: JSON.stringify({
                            model: "gpt-4o-mini",
                            messages: [
                                {
                                    role: "system",
                                    content:
                                        "Eres un analista financiero experto. Dado los siguientes datos, debes hacer un análisis detallado de la empresa.",
                                },
                                {
                                    role: "user",
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
                                    `,
                                },
                            ],
                        }),
                    });
                    const data = await response.json();

                    if (data && data.choices) {
                        const rawContent = data.choices[0].message.content.trim();
                        try {
                            const parsed = JSON.parse(rawContent);
                            setInterpretation(parsed);
                        } catch (e) {
                            throw new Error("La respuesta no es un JSON válido.");
                        }
                    } else {
                        throw new Error("Respuesta inesperada de la API.");
                    }
                } catch (err) {
                    console.error(err);
                    setError(err.message || "Ocurrió un error al procesar la solicitud.");
                } finally {
                    setLoading(false);
                }
            }

            openGPT();
        }
    }, [ratios, balance, news, actions]);

    if (loading) return <p>Cargando...</p>;

    if (error) return <p className="text-red-500">{error}</p>;

    if (!interpretation) return null;

    return (
        <div>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gray-900 drop-shadow-lg">
                Interpretación
            </h1>
            <Separator />
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
        </div>
    );
};
