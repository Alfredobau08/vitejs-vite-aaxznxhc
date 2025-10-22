import React, { useState } from 'react';
import { Calculator, FileText, Award, AlertCircle } from 'lucide-react';

export default function CalculadoraCalificacion() {
  const [estudiante, setEstudiante] = useState({ nombre: '', codigo: '' });
  const [fecha, setFecha] = useState(new Date().toLocaleDateString('es-CO'));
  
  const [uml, setUml] = useState({
    identificacionClases: 0,
    clasesAbstractas: 0,
    jerarquias: 0,
    relaciones: 0,
    capas: 0,
    atributos: 0,
    metodos: 0
  });

  const [modelo, setModelo] = useState({
    persona: 0,
    pasajero: 0,
    vuelo: 0,
    vueloNacional: 0,
    vueloInternacional: 0,
    reserva: 0,
    equipaje: 0
  });

  const [persistencia, setPersistencia] = useState({
    pasajeroRepo: 0,
    vueloRepo: 0,
    reservaRepo: 0,
    equipajeRepo: 0
  });

  const [logica, setLogica] = useState({
    pasajeroService: 0,
    vueloService: 0,
    reservaService: 0,
    equipajeService: 0
  });

  const [presentacion, setPresentacion] = useState({
    menuPrincipal: 0,
    main: 0
  });

  const [bonificacion, setBonificacion] = useState(0);
  const [penalizacion, setPenalizacion] = useState(0);

  const totalUml = Object.values(uml).reduce((a, b) => a + b, 0);
  const totalModelo = Object.values(modelo).reduce((a, b) => a + b, 0);
  const totalPersistencia = Object.values(persistencia).reduce((a, b) => a + b, 0);
  const totalLogica = Object.values(logica).reduce((a, b) => a + b, 0);
  const totalPresentacion = Object.values(presentacion).reduce((a, b) => a + b, 0);

  const subtotal = totalUml + totalModelo + totalPersistencia + totalLogica + totalPresentacion;
  const notaFinal = Math.max(0, Math.min(5.0, subtotal + bonificacion - penalizacion));

  const getNivel = (nota) => {
    if (nota >= 4.6) return { texto: 'Excelente', color: 'text-green-600' };
    if (nota >= 4.0) return { texto: 'Sobresaliente', color: 'text-blue-600' };
    if (nota >= 3.5) return { texto: 'Bueno', color: 'text-yellow-600' };
    if (nota >= 3.0) return { texto: 'Aceptable', color: 'text-orange-600' };
    return { texto: 'Insuficiente', color: 'text-red-600' };
  };

  const nivel = getNivel(notaFinal);

  const InputSection = ({ title, data, setData, maxValues }) => (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h3 className="font-bold text-lg mb-3 text-gray-800">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Object.entries(data).map(([key, value]) => {
          const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          const max = maxValues[key];
          return (
            <div key={key} className="flex items-center justify-between">
              <label className="text-sm text-gray-700 flex-1">{label}</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max={max}
                value={value}
                onChange={(e) => {
                  const val = Math.min(max, Math.max(0, parseFloat(e.target.value) || 0));
                  setData({ ...data, [key]: val });
                }}
                className="w-20 px-2 py-1 border rounded text-right"
              />
              <span className="ml-2 text-sm text-gray-500">/ {max.toFixed(2)}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 pt-3 border-t">
        <div className="flex justify-between font-bold">
          <span>Subtotal:</span>
          <span>{Object.values(data).reduce((a, b) => a + b, 0).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

  const generarInforme = () => {
    return `
═══════════════════════════════════════════════════
    EVALUACIÓN EXAMEN FINAL - SISTEMA GLOBALAIR
═══════════════════════════════════════════════════

ESTUDIANTE: ${estudiante.nombre || '___________________'}
CÓDIGO: ${estudiante.codigo || '___________'}
FECHA: ${fecha}

───────────────────────────────────────────────────
COMPONENTE                          MÁXIMO  OBTENIDO
───────────────────────────────────────────────────

1. ANÁLISIS Y DISEÑO (UML)          0.75    ${totalUml.toFixed(2)}
2. CAPA DE MODELO                   1.50    ${totalModelo.toFixed(2)}
3. CAPA DE PERSISTENCIA             1.25    ${totalPersistencia.toFixed(2)}
4. CAPA DE LÓGICA                   1.25    ${totalLogica.toFixed(2)}
5. CAPA DE PRESENTACIÓN             0.25    ${totalPresentacion.toFixed(2)}

───────────────────────────────────────────────────

SUBTOTAL                            5.00    ${subtotal.toFixed(2)}

BONIFICACIÓN                        0.30    ${bonificacion.toFixed(2)}
PENALIZACIONES                             -${penalizacion.toFixed(2)}

═══════════════════════════════════════════════════
NOTA FINAL                          5.00    ${notaFinal.toFixed(2)}
═══════════════════════════════════════════════════

NIVEL DE DESEMPEÑO: ${nivel.texto}
${notaFinal >= 3.0 ? 'APROBADO ✓' : 'NO APROBADO ✗'}

Fecha de evaluación: ${fecha}
    `.trim();
  };

  const copiarInforme = () => {
    navigator.clipboard.writeText(generarInforme());
    alert('Informe copiado al portapapeles');
  };

  const reiniciar = () => {
    if (window.confirm('¿Estás seguro de reiniciar todos los valores?')) {
      setEstudiante({ nombre: '', codigo: '' });
      setUml({
        identificacionClases: 0,
        clasesAbstractas: 0,
        jerarquias: 0,
        relaciones: 0,
        capas: 0,
        atributos: 0,
        metodos: 0
      });
      setModelo({
        persona: 0,
        pasajero: 0,
        vuelo: 0,
        vueloNacional: 0,
        vueloInternacional: 0,
        reserva: 0,
        equipaje: 0
      });
      setPersistencia({
        pasajeroRepo: 0,
        vueloRepo: 0,
        reservaRepo: 0,
        equipajeRepo: 0
      });
      setLogica({
        pasajeroService: 0,
        vueloService: 0,
        reservaService: 0,
        equipajeService: 0
      });
      setPresentacion({
        menuPrincipal: 0,
        main: 0
      });
      setBonificacion(0);
      setPenalizacion(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Calculator className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">
                Calculadora de Calificación - Sistema GlobalAir
              </h1>
            </div>
            <button
              onClick={reiniciar}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Reiniciar
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Nombre del estudiante"
              value={estudiante.nombre}
              onChange={(e) => setEstudiante({ ...estudiante, nombre: e.target.value })}
              className="px-3 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Código"
              value={estudiante.codigo}
              onChange={(e) => setEstudiante({ ...estudiante, codigo: e.target.value })}
              className="px-3 py-2 border rounded"
            />
            <input
              type="text"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="px-3 py-2 border rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <InputSection
              title="1. Análisis y Diseño (UML) - 0.75"
              data={uml}
              setData={setUml}
              maxValues={{
                identificacionClases: 0.15,
                clasesAbstractas: 0.10,
                jerarquias: 0.15,
                relaciones: 0.15,
                capas: 0.10,
                atributos: 0.05,
                metodos: 0.05
              }}
            />

            <InputSection
              title="2. Capa de Modelo - 1.50"
              data={modelo}
              setData={setModelo}
              maxValues={{
                persona: 0.20,
                pasajero: 0.15,
                vuelo: 0.25,
                vueloNacional: 0.20,
                vueloInternacional: 0.20,
                reserva: 0.30,
                equipaje: 0.20
              }}
            />

            <InputSection
              title="3. Capa de Persistencia - 1.25"
              data={persistencia}
              setData={setPersistencia}
              maxValues={{
                pasajeroRepo: 0.3125,
                vueloRepo: 0.3125,
                reservaRepo: 0.3125,
                equipajeRepo: 0.3125
              }}
            />
          </div>

          <div>
            <InputSection
              title="4. Capa de Lógica - 1.25"
              data={logica}
              setData={setLogica}
              maxValues={{
                pasajeroService: 0.25,
                vueloService: 0.30,
                reservaService: 0.45,
                equipajeService: 0.25
              }}
            />

            <InputSection
              title="5. Capa de Presentación - 0.25"
              data={presentacion}
              setData={setPresentacion}
              maxValues={{
                menuPrincipal: 0.20,
                main: 0.05
              }}
            />

            <div className="bg-white p-4 rounded-lg shadow mb-4">
              <h3 className="font-bold text-lg mb-3 text-gray-800">Ajustes Finales</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-700">Bonificación (máx 0.30)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="0.30"
                    value={bonificacion}
                    onChange={(e) => setBonificacion(Math.min(0.30, Math.max(0, parseFloat(e.target.value) || 0)))}
                    className="w-20 px-2 py-1 border rounded text-right"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-700">Penalización</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="5"
                    value={penalizacion}
                    onChange={(e) => setPenalizacion(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-20 px-2 py-1 border rounded text-right"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Resultado Final</h2>
            <Award className="w-8 h-8 text-yellow-500" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
            <div className="text-center p-3 bg-blue-50 rounded">
              <div className="text-sm text-gray-600">UML</div>
              <div className="text-xl font-bold text-blue-600">{totalUml.toFixed(2)}</div>
              <div className="text-xs text-gray-500">/ 0.75</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded">
              <div className="text-sm text-gray-600">Modelo</div>
              <div className="text-xl font-bold text-green-600">{totalModelo.toFixed(2)}</div>
              <div className="text-xs text-gray-500">/ 1.50</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded">
              <div className="text-sm text-gray-600">Persistencia</div>
              <div className="text-xl font-bold text-purple-600">{totalPersistencia.toFixed(2)}</div>
              <div className="text-xs text-gray-500">/ 1.25</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded">
              <div className="text-sm text-gray-600">Lógica</div>
              <div className="text-xl font-bold text-orange-600">{totalLogica.toFixed(2)}</div>
              <div className="text-xs text-gray-500">/ 1.25</div>
            </div>
            <div className="text-center p-3 bg-pink-50 rounded">
              <div className="text-sm text-gray-600">Presentación</div>
              <div className="text-xl font-bold text-pink-600">{totalPresentacion.toFixed(2)}</div>
              <div className="text-xs text-gray-500">/ 0.25</div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg">Subtotal:</span>
              <span className="text-2xl font-bold">{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2 text-green-600">
              <span>Bonificación:</span>
              <span className="font-semibold">+{bonificacion.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-4 text-red-600">
              <span>Penalizaciones:</span>
              <span className="font-semibold">-{penalizacion.toFixed(2)}</span>
            </div>
            <div className="border-t pt-4 flex justify-between items-center">
              <span className="text-2xl font-bold">NOTA FINAL:</span>
              <div className="text-right">
                <div className={`text-4xl font-bold ${nivel.color}`}>
                  {notaFinal.toFixed(2)}
                </div>
                <div className={`text-lg ${nivel.color}`}>
                  {nivel.texto}
                </div>
                <div className={`text-sm font-semibold ${notaFinal >= 3.0 ? 'text-green-600' : 'text-red-600'}`}>
                  {notaFinal >= 3.0 ? '✓ APROBADO' : '✗ NO APROBADO'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={copiarInforme}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg"
          >
            <FileText className="w-5 h-5" />
            Copiar Informe Completo
          </button>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Instrucciones:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Ingresa las calificaciones para cada componente</li>
                <li>Los valores se limitan automáticamente a los máximos permitidos</li>
                <li>La bonificación máxima es 0.30 puntos</li>
                <li>Usa el botón "Copiar Informe" para obtener el informe formateado</li>
                <li>Puedes reiniciar todos los valores con el botón rojo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}