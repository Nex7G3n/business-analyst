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
            // async function openGPT() {
            //     console.log(apiKey);
            //     try {
            //         const response = await fetch('https://api.openai.com/v1/chat/completions', {
            //             method: 'POST',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //                 'Authorization': `Bearer ${apiKey}`
            //             },
            //             body: JSON.stringify({
            //                 model: 'gpt-4o-mini',
            //                 messages: [
            //                     {
            //                         role: 'system',
            //                         content: 'Eres un analista financiero experto. Dado los siguientes datos, debes hacer un análisis detallado de la empresa.'
            //                     },
            //                     {
            //                         role: 'user',
            //                         content: `
            //                             Aquí tienes un informe financiero:
            //                             - Balance: ${JSON.stringify(balance)}
            //                             - Noticias relevantes: ${JSON.stringify(news)}
            //                             - Acciones recientes: ${JSON.stringify(actions)}
            //                             - Ratios financieros: ${JSON.stringify(ratios)}

            //                             Realiza un análisis financiero detallado y proporciona una predicción clara en formato JSON con los siguientes campos:
            //                             {
            //                                 "decision": "invertir" o "no invertir",
            //                                 "motivos": "explicación clara",
            //                                 "rentabilidad_esperada": "porcentaje",
            //                                 "tiempo_estimado_retorno": "meses",
            //                                 "analisis_rentabilidad": "análisis de márgenes y ROI",
            //                                 "tendencia_ventas": "tendencia de ventas en el tiempo",
            //                                 "analisis_deuda": "evaluación de la deuda y capacidad de pago",
            //                                 "proyecciones_dividendos": "proyección de dividendos futuros"
            //                             }
            //                             No incluyas recomendaciones para investigar más, solo el análisis solicitado, devuelveme solo un array con lo que te pedi, sin estilos, necesito un formato lo mas parecido a json posible.
            //                         `
            //                     }
            //                 ]
            //             })
            //         });
            //         const data = await response.json();
            //         return data;
            //     } catch (err) {
            //         console.error(err);
            //         setError('Ocurrió un error al procesar la solicitud.');
            //     }
            // }

            // openGPT().then(response => {
            //     console.log(response);
            //     if (response && response.choices) {
            //         // Limpiamos el contenido recibido para evitar errores de JSON
            //         const rawContent = response.choices[0].message.content.trim();
            //         console.log("Contenido recibido:", rawContent);
            //         try {
            //             const parsed = JSON.parse(rawContent);
            //             setInterpretation(parsed);
            //         } catch (e) {
            //             console.error("Error al parsear el JSON:", e);
            //             setError('Error al interpretar la respuesta. La respuesta no es un JSON válido.');
            //         }
            //     } else {
            //         setError('Error al interpretar la respuesta.');
            //     }
            // });
            setInterpretation({
                "decision": "no invertir",
                "motivos": "La empresa presenta una alta relación P/E de 25.79 y un precio/valor contable de 8.93, lo que sugiere que las acciones están sobrevaloradas en comparación con sus ganancias y activos. Además, la empresa tiene un total de obligaciones que supera su capital social, lo que indica una situación de endeudamiento preocupante.",
                "rentabilidad_esperada": "5%",
                "tiempo_estimado_retorno": "24 meses",
                "analisis_rentabilidad": "Los márgenes de rentabilidad parecen estar bajo presión debido a altos gastos por pagar y obligaciones, así como a la falta de crecimiento significativo en los ingresos. El retorno sobre la inversión (ROI) no se puede calcular con los datos actuales, pero la situación indica un riesgo alto.",
                "tendencia_ventas": "Los datos sobre la tendencia de ventas no son suficientes, pero la estabilidad de ingresos es cuestionable dada la estructura de deuda y obligaciones actuales.",
                "analisis_deuda": "La empresa tiene obligaciones totales de aproximadamente 112.6 mil millones, con un capital social de 59.6 mil millones. Esto indica una relación de deuda sobre capital muy alta, lo que podría afectar su capacidad de pago y constante crecimiento.",
                "proyecciones_dividendos": "Dividendo anual de 6.65 parece atractivo, pero con un payout ratio de 0, sugiere que no se están distribuyendo beneficios. Dicha situación puede variar, pero la sostenibilidad no está garantizada dado el actual apalancamiento financiero."
            });
        } else {
            console.log("No se puede realizar la operación");
        }
    }, [ratios, balance, news, actions]);

    return (
        <div>
            <h1>Interpretación</h1>
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
