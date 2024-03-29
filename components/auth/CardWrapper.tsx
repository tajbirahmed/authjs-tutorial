"use client"; 

import {
    Card, 
    CardContent, 
    CardFooter, 
    CardHeader
} from "@/components/ui/card";
import { Header } from "@/components/auth/Header";
import { SocialComponent } from "@/components/auth/SocialComponent";
import { BackButtonComponent } from "./BackButtonComponent";

interface CardWrapperProps { 
    children: React.ReactNode, 
    headerLabel: string, 
    backButtonLabel: string, 
    backButtonHref: string, 
    showSocial?: boolean
}

const CardWrapper = ({ 
    children, 
    headerLabel,
    backButtonLabel, 
    backButtonHref, 
    showSocial
}:CardWrapperProps) => {
  return (
      <Card className="w-[400px] shadow-lg rounded-lg">
          <CardHeader>
              <Header
                  label={ headerLabel }
              />
          </CardHeader>
          <CardContent>
              {children}
          </CardContent>
          {showSocial && (
              <CardFooter>
                  <SocialComponent />
              </CardFooter>
          )}
          <CardFooter>
              <BackButtonComponent
                  label={backButtonLabel}
                  href={ backButtonHref}
              />
          </CardFooter>
    </Card>
  )
}

export default CardWrapper