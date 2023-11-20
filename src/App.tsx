import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip
} from 'chart.js'
import { PolarArea } from 'react-chartjs-2'
import html2canvas from 'html2canvas'
import { useState } from 'react'

export const INSTA_ICON="https://raw.githubusercontent.com/gauravghongde/social-icons/9d939e1c5b7ea4a24ac39c3e4631970c0aa1b920/SVG/White/Instagram_white.svg"

ChartJS.register(RadialLinearScale, ArcElement, Tooltip)

/** 
 * @param data data[]
 * @param labels label[]
*/
const Results = ({ data, labels }: any) => {
  return (
    <>
      {data.datasets[0].backgroundColor.map((color: string, i: number) => (
        <div key={color} className='flex items-center gap-2'>
          <div
            className='relative w-8 h-8 text-center text-white font-bold'
            style={{ backgroundColor: color }}
          >
            {data.datasets[0].data[i]}
          </div>
          <span className='text-sm'>{labels[i]}</span>
        </div>
      ))}
    </>
  )
}

export default function App() {
  const [values, setValues] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [colors, setColors] = useState([
    '#84cc16',
    '#a3e635',
    '#bef264',
    '#7c3aed',
    '#8b5cf6',
    '#a78bfa',
    '#0ea5e9',
    '#38bdf8',
    '#7dd3fc',
    '#f97316',
    '#fb923c',
    '#fdba74',
  ])
  const [labels, setLabels] = useState([
    'Intelectual',
    'Saúde',
    'Emocional',
    'Profissional',
    'Financeiro',
    'Social',
    'Conjugal',
    'Filhos',
    'Parentes',
    'Próximo',
    'Tempo',
    'Espiritualidade',
  ])

  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: 'valor',
        data: values,
        backgroundColor: colors,
      },
    ],
    borderWidth: 1,
  })

  const changeData = (arr: any, type: 'data' | 'color' | 'labels') => {
    setData({
      labels: labels,
      datasets: [
        {
          label: 'valor',
          data: type === 'data' ? arr : values,
          backgroundColor: type === 'color' ? arr : colors,
        },
      ],
      borderWidth: 1,
    })
  }

  const changeValues = (e: React.ChangeEvent<HTMLInputElement>, pos: number) => {
    if (+e.target.value < 0 || +e.target.value > 10) return

    const arr = [...values]
    arr[pos] = +e.target.value
    setValues(arr)

    changeData(arr, 'data')
  }

  const changeColors = (e: React.ChangeEvent<HTMLInputElement>, pos: number) => {
    if (e.target.value.length !== 7) return

    const arr = [...colors]
    arr[pos] = e.target.value
    setColors(arr)

    changeData(arr, 'color')
  }

  const changeLabels = (e: React.ChangeEvent<HTMLInputElement>, pos: number) => {
    const arr = [...labels]

    arr[pos] = e.target.value

    setLabels(arr)
  }

  const downloadImage = () => {
    const capture = document.querySelector("#capture") as HTMLDivElement
    html2canvas(capture).then(canvas => {
      const link = document.createElement('a')
      link.download = 'roda_da_vida.jpg'
      link.href = canvas.toDataURL('image/jpg')
      link.click()
    })
  }

  return (
    <main className='flex flex-col min-h-screen p-6 xl:p-24 bg-slate-800 space-y-10'>
      <a href="https://www.instagram.com/valeriagramss/" target='_blank' className='flex items-center justify-center gap-2 p-2 w-full text-zinc-300'>
        <img src={INSTA_ICON} className='w-8 h-8' alt="" />
        <p>@valeriagramss</p>
      </a>

      <h1 className='text-4xl py-6 font-bold text-orange-400'>Círculo da Vida Online</h1>

      <div className='space-y-6'>
        <h2 className='text-2xl font-bold text-white'>O que é a roda da vida?</h2>
        <p className='text-lg text-zinc-300'>Um mínimo movimento pode resultar em uma vida totalmente diferente no futuro. Veja a amplitude de seus movimnentos - escolhas decisões. <br />
          Preencha o Círculo da Vida com notas de 1 a 10, de acordo com sua satisfação pessoal em cada área.</p>
      </div>

      <div className='flex flex-col lg:flex-row gap-8 items-center w-full h-full bg-white p-4 lg:px-12'>
        <form className='w-full md:w-1/2 lg:w-1/3 flex flex-col gap-2'>
          <h4 className='text-xl font-bold'>Categorias</h4>
          <hr className='mb-4' />

          {labels.map((item, i) => (
            <div className='flex flex-col' key={i}>
              <div className="flex">
                <input
                  className='flex-1 h-10 p-2 rounded focus:outline-none text-zinc-700 border border-zinc-300'
                  name={item}
                  defaultValue={item}
                  onChange={e => changeLabels(e, i)}
                />

                <input
                  className='lg:w-16 h-10 p-2 rounded focus:outline-none border border-zinc-300'
                  type='number'
                  min={1}
                  max={10}
                  defaultValue={data.datasets[0].data[i]}
                  onChange={e => changeValues(e, i)}
                />

                <input
                  type='color'
                  className='lg:w-10 h-10 rounded focus:outline-none border-none'
                  value={data.datasets[0].backgroundColor[i]}
                  onChange={e => changeColors(e, i)}
                />
              </div>
            </div>
          ))}
        </form>

        <div className='flex flex-col lg:flex-row gap-8 items-center w-full h-full' id="capture">
          <div className='w-full lg:w-2/3 flex items-center justify-center aspect-square'>
            <PolarArea 
              data={data} 
              className='md:p-12'
              options={{ 
                scales: {
                  r: { 
                    min: 0,
                    max: 10,
                  }
                }
              }} 
            />
          </div>

          <div className='w-full lg:w-[20rem] h-full space-y-4'>
            <div className='lg:py-4'></div>
            <Results data={data} labels={labels} />
          </div>
        </div>
      </div>

      <div className='w-full text-center'>
        <button
          onClick={downloadImage}
          className='w-[20rem] p-4 bg-orange-500 text-white font-bold rounded'
        >
          Imprimir
        </button>
      </div>

      <div className='space-y-6'>
        <h2 className='text-2xl font-bold text-white'>
          Parabéns, a sua roda da vida está pronta! <br />E agora?
        </h2>
        <p className='text-lg text-zinc-300'>
          Com a roda da vida pronta, você pode comparar cada área com a pontuação que você considera ideal em cada categoria. Use essa ferramenta para identificar as áreas em desequilibrio e decidir quais mudanças e ações são necessárias para encontrar o equilibrio.
          Você pode salvar a roda da vida e, de tempos em tempos, refazer esse exercício e comparar os resultados
        </p>
      </div>

      <a href="https://www.instagram.com/valeriagramss/" className='flex items-center justify-center gap-2 p-2 w-full bg-slate-500 hover:bg-orange-500 rounded transition-all'>
        <span>Siga no Instagram</span>
        <img src="https://raw.githubusercontent.com/gauravghongde/social-icons/9d939e1c5b7ea4a24ac39c3e4631970c0aa1b920/SVG/White/Instagram_white.svg" className='w-8 h-8' alt="" />
        <p>@valeriagramss</p>
      </a>
    </main>
  )
}
