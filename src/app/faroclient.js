"use client";

import { useRef, useEffect } from 'react';
import { initializeFaro as coreInit, ReactIntegration, getWebInstrumentations } from '@grafana/faro-react';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
export default function FaroClient() {
    const faroRef = useRef(null);

    useEffect(() => {
        if (!faroRef.current) {
            try {
                // Initialize Grafana Faro
                const faro = coreInit({
                    url: process.env.NEXT_PUBLIC_FARO_URL || "https://faro-collector-prod-ap-south-0.grafana.net/collect/973f39176e0cc8098d780c25cfa8e8e6",
                    app: {
                        name: "faro-nextjs-app",
                        version: '1.0.0',
                        environment: 'production',
                    },
                    instrumentations: [
                        ...getWebInstrumentations({
                            captureConsole: true,
                        }),
                        new TracingInstrumentation(),
                        new ReactIntegration(),
                    ],
                    isolate: true,
                });

                faroRef.current = faro; // Store the instance in the ref for future use

                console.log('Faro Initialized');

            } catch (error) {
                console.error('Error initializing Faro:', error);
            }
        }
    }, []);

    return null; // This component doesn't render anything in the UI
}
