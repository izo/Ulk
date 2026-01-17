📦 Workflow Audit Repo Git                                                                                                                                                                                         
																																																					 
  Phase 1 : Compréhension du projet                                                                                                                                                                                  
																																																					 
  # Générer la spec complète du repo                                                                                                                                                                                 
  /woodman:agents:spec-writer                                                                                                                                                                                        
																																																					 
  Ce qu'il fait :                                                                                                                                                                                                    
  - Détecte automatiquement la stack (Nuxt, Next, Laravel, Python, etc.)                                                                                                                                             
  - Analyse l'architecture                                                                                                                                                                                           
  - Identifie les entry points, configs, dépendances                                                                                                                                                                 
  - Génère spec.md complet                                                                                                                                                                                           
																																																					 
  Génère : spec.md - documentation complète du projet                                                                                                                                                                
																																																					 
  ---                                                                                                                                                                                                                
  Phase 2 : Audit approfondi                                                                                                                                                                                         
																																																					 
  # Audit code complet                                                                                                                                                                                               
  /woodman:agents:code-auditor                                                                                                                                                                                       
																																																					 
  Analyse :                                                                                                                                                                                                          
  - ✅ Architecture (couplage, abstractions, patterns)                                                                                                                                                               
  - ✅ Qualité code (duplication, complexité, naming)                                                                                                                                                                
  - ✅ Sécurité (OWASP, vulnérabilités)                                                                                                                                                                              
  - ✅ Performance (N+1, bundle, memory leaks)                                                                                                                                                                       
  - ✅ Tests (coverage, qualité)                                                                                                                                                                                     
  - ✅ Dette technique (TODO, hacks, deprecated)                                                                                                                                                                     
																																																					 
  Génère : audit-code-YYYYMMDD.md avec scores et recommandations                                                                                                                                                     
																																																					 
  ---                                                                                                                                                                                                                
  Phase 3 : Actions selon les résultats                                                                                                                                                                              
																																																					 
  Si beaucoup de complexité détectée :                                                                                                                                                                               
																																																					 
  /woodman:agents:code-simplifier                                                                                                                                                                                    
  - Identifie les fichiers les plus complexes                                                                                                                                                                        
  - Priorise les opportunités de simplification                                                                                                                                                                      
  - Applique les simplifications                                                                                                                                                                                     
																																																					 
  Si des erreurs/bugs présents :                                                                                                                                                                                     
																																																					 
  /woodman:agents:robocop                                                                                                                                                                                            
  # Ou : "Fix issue #42" / "Fix this error: [stacktrace]"                                                                                                                                                            
  - Diagnostic précis                                                                                                                                                                                                
  - Fix minimal                                                                                                                                                                                                      
  - Vérification automatique                                                                                                                                                                                         
																																																					 
  Si problèmes de performance :                                                                                                                                                                                      
																																																					 
  /woodman:agents:perf-auditor                                                                                                                                                                                       
  - Core Web Vitals                                                                                                                                                                                                  
  - Bundle analysis                                                                                                                                                                                                  
  - Backend/API optimizations                                                                                                                                                                                        
																																																					 
  Si problèmes d'accessibilité :                                                                                                                                                                                     
																																																					 
  /woodman:agents:a11y-auditor                                                                                                                                                                                       
  - WCAG 2.1/2.2 compliance                                                                                                                                                                                          
  - Tests automatisés + manuels                                                                                                                                                                                      
																																																					 
  ---                                                                                                                                                                                                                
  Phase 4 : Planification des améliorations                                                                                                                                                                          
																																																					 
  # Générer un plan d'action                                                                                                                                                                                         
  /woodman:agents:todo-generator                                                                                                                                                                                     
																																																					 
  Créera un todo.md priorisé basé sur spec.md et les audits                                                                                                                                                          
																																																					 
  ---                                                                                                                                                                                                                
  🚀 Workflow Ultra-Complet (recommandé)                                                                                                                                                                             
																																																					 
  # 1. Comprendre le projet                                                                                                                                                                                          
  /woodman:agents:spec-writer                                                                                                                                                                                        
																																																					 
  # 2. Audit général                                                                                                                                                                                                 
  /woodman:agents:code-auditor                                                                                                                                                                                       
																																																					 
  # 3. Analyse stack-specific (optionnel)                                                                                                                                                                            
  /woodman:analyze:nuxt    # Si Nuxt détecté                                                                                                                                                                         
  # Ou /woodman:analyze:next, :astro, :swiftui, :spip                                                                                                                                                                
																																																					 
  # 4. Simplification                                                                                                                                                                                                
  /woodman:agents:code-simplifier                                                                                                                                                                                    
																																																					 
  # 5. Fix erreurs                                                                                                                                                                                                   
  /woodman:agents:robocop                                                                                                                                                                                            
																																																					 
  # 6. Audits spécialisés                                                                                                                                                                                            
  /woodman:agents:perf-auditor                                                                                                                                                                                       
  /woodman:agents:a11y-auditor                                                                                                                                                                                       
																																																					 
  # 7. Plan d'action                                                                                                                                                                                                 
  /woodman:agents:todo-generator                                                                                                                                                                                     
																																																					 
  # 8. Documentation finale                                                                                                                                                                                          
  /woodman:agents:sync-local                                                                                                                                                                                         
																																																					 
  ---                                                                                                                                                                                                                
  💡 Workflow Minimal (quick audit)                                                                                                                                                                                  
																																																					 
  Si vous voulez juste un diagnostic rapide :                                                                                                                                                                        
																																																					 
  # Audit code uniquement                                                                                                                                                                                            
  /woodman:agents:code-auditor                                                                                                                                                                                       
																																																					 
  Puis selon le rapport, lancez les agents spécifiques.                                                                                                                                                              
																																																					 
  ---                                                                                                                                                                                                                
  🎯 Exemple concret                                                                                                                                                                                                 
																																																					 
  # Vous : "Je veux auditer ce repo"                                                                                                                                                                                 
  /woodman:agents:spec-writer                                                                                                                                                                                        
																																																					 
  # Claude génère spec.md → détecte "Nuxt 3 + TypeScript"                                                                                                                                                            
																																																					 
  # Vous : "Audit complet maintenant"                                                                                                                                                                                
  /woodman:agents:code-auditor                                                                                                                                                                                       
																																																					 
  # Claude trouve :                                                                                                                                                                                                  
  # - 15 fichiers complexes (>20 cyclomatic complexity)                                                                                                                                                              
  # - 3 vulnérabilités sécurité                                                                                                                                                                                      
  # - Bundle size trop élevé (2.5MB)                                                                                                                                                                                 
																																																					 
  # Actions recommandées dans le rapport :                                                                                                                                                                           
  # 1. Simplifier les composants complexes                                                                                                                                                                           
  # 2. Fixer les vulnérabilités                                                                                                                                                                                      
  # 3. Optimiser le bundle                                                                                                                                                                                           
																																																					 
  # Vous lancez :                                                                                                                                                                                                    
  /woodman:agents:code-simplifier                                                                                                                                                                                    
  /woodman:agents:robocop                                                                                                                                                                                            
  /woodman:agents:perf-auditor                                                                                                                                                                                       
													  