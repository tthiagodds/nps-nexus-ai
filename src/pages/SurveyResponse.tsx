import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star, Send, ThumbsUp } from "lucide-react";
import { useParams } from "react-router-dom";

export default function SurveyResponse() {
  const { campaignId } = useParams();
  const [npsScore, setNpsScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Mock campaign data - in real app, fetch based on campaignId
  const campaign = {
    id: campaignId,
    name: "Pesquisa de Satisfação - SENTai",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=80&fit=crop&crop=center",
    brandColor: "#2563eb",
    welcomeMessage: "Olá! Gostaríamos de saber como foi sua experiência conosco.",
    questions: [
      {
        id: 1,
        type: "nps",
        title: "Em uma escala de 0 a 10, o quanto você recomendaria nossos serviços?",
        subtitle: "0 = Não recomendaria de forma alguma | 10 = Recomendaria com certeza"
      },
      {
        id: 2,
        type: "text",
        title: "Conte-nos mais sobre sua experiência:",
        subtitle: "Sua opinião é muito importante para nós!"
      }
    ]
  };

  const handleScoreSelect = (score: number) => {
    setNpsScore(score);
  };

  const handleSubmit = () => {
    // In real app, send data to API
    console.log({
      campaignId,
      npsScore,
      feedback,
      timestamp: new Date()
    });
    setSubmitted(true);
  };

  const getScoreColor = (score: number) => {
    if (score <= 6) return "bg-red-500 hover:bg-red-600";
    if (score <= 8) return "bg-yellow-500 hover:bg-yellow-600";
    return "bg-green-500 hover:bg-green-600";
  };

  const getSelectedScoreColor = (score: number) => {
    if (score <= 6) return "bg-red-500";
    if (score <= 8) return "bg-yellow-500";
    return "bg-green-500";
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <ThumbsUp className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Obrigado pelo seu feedback!
              </h1>
              <p className="text-muted-foreground text-lg">
                Sua opinião foi registrada com sucesso. Muito obrigado por dedicar seu tempo para nos ajudar a melhorar!
              </p>
            </div>
            
            <div className="bg-muted rounded-lg p-6">
              <p className="text-sm text-muted-foreground">
                Sua resposta ajuda nossa equipe a entender melhor suas necessidades e aprimorar nossos serviços continuamente.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center pb-6">
          {campaign.logo && (
            <div className="mb-4">
              <img 
                src={campaign.logo} 
                alt="Logo" 
                className="h-16 mx-auto rounded-lg object-cover"
              />
            </div>
          )}
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {campaign.name}
          </h1>
          <p className="text-muted-foreground text-lg">
            {campaign.welcomeMessage}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* NPS Question */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {campaign.questions[0].title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {campaign.questions[0].subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-11 gap-2">
              {Array.from({ length: 11 }, (_, i) => (
                <Button
                  key={i}
                  variant={npsScore === i ? "default" : "outline"}
                  className={`aspect-square p-0 text-lg font-bold ${
                    npsScore === i 
                      ? `text-white ${getSelectedScoreColor(i)}` 
                      : 'hover:text-white'
                  } ${npsScore !== i ? `hover:${getScoreColor(i)}` : ''}`}
                  onClick={() => handleScoreSelect(i)}
                >
                  {i}
                </Button>
              ))}
            </div>
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Não recomendaria</span>
              <span>Recomendaria com certeza</span>
            </div>
          </div>

          {/* Feedback Question */}
          {npsScore !== null && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {campaign.questions[1].title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {campaign.questions[1].subtitle}
                </p>
              </div>
              
              <Textarea
                placeholder="Compartilhe sua experiência conosco..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-32 resize-none"
              />
            </div>
          )}

          {/* Submit Button */}
          {npsScore !== null && (
            <div className="text-center pt-4">
              <Button 
                onClick={handleSubmit}
                className="px-8 py-3 text-lg"
                disabled={!feedback.trim()}
              >
                <Send className="h-5 w-5 mr-2" />
                Enviar Feedback
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}