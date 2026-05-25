import { Star } from "lucide-react";
import type { Hero } from "../interfaces/HeroesResponse";
import { Badge } from "@/components/ui/badge";

interface Props {
    superheroData: Hero
}

export const HeroBanner = ({ superheroData }: Props) => {
    const totalPower = superheroData.strength + superheroData.intelligence + superheroData.speed + superheroData.durability
    const averagePower = Math.round((totalPower / 4) * 10)

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "activo":
                return "bg-green-500"
            case "inactivo":
                return "bg-gray-500"
            case "retirado":
                return "bg-blue-500"
            default:
                return "bg-gray-500"
        }
    }

    const getCategoryColor = (category: string) => {
        switch (category.toLowerCase()) {
            case "héroe":
                return "bg-blue-500"
            case "villano":
                return "bg-red-500"
            case "antihéroe":
                return "bg-purple-500"
            default:
                return "bg-gray-500"
        }
    }

    return (
        <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white rounded-lg">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="relative">
                        <img
                            src={superheroData.image}
                            alt={superheroData.alias}
                            width={200}
                            height={200}
                            className="rounded-full border-4 border-white/20 shadow-2xl"
                        />
                        <div className="absolute -top-2 -right-2">
                            <div className="bg-yellow-400 text-black rounded-full p-2">
                                <Star className="w-6 h-6" />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                            <Badge className={`${getCategoryColor(superheroData.category)} text-white`}>
                                {superheroData.category}
                            </Badge>
                            <Badge className={`${getStatusColor(superheroData.status)} text-white`}>{superheroData.status}</Badge>
                            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                                {superheroData.universe}
                            </Badge>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-2">{superheroData.alias}</h1>
                        <p className="text-xl text-blue-200 mb-4">{superheroData.name}</p>
                        <p className="text-lg text-gray-300 max-w-2xl">{superheroData.description}</p>
                    </div>

                    <div className="text-center">
                        <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                            <div className="text-3xl font-bold text-yellow-400">{averagePower}%</div>
                            <div className="text-sm text-gray-300">Nivel de Poder</div>
                            <div className="flex justify-center mt-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < Math.floor(averagePower / 20) ? "text-yellow-400 fill-current" : "text-gray-400"}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
