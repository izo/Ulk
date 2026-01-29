📦 Workflow Audit Repo Git                                                                                                                                                                                         
																																																					 
  Phase 1 : Compréhension du projet                                                                                                                                                                                  
																																																					 
  # Générer la spec complète du repo                                                                                                                                                                                 
  /ulk:agents:spec-writer                                                                                                                                                                                        
																																																					 
  Ce qu'il fait :                                                                                                                                                                                                    
  - Détecte automatiquement la stack (Nuxt, Next, Laravel, Python, etc.)                                                                                                                                             
  - Analyse l'architecture                                                                                                                                                                                           
  - Identifie les entry points, configs, dépendances                                                                                                                                                                 
  - Génère spec.md complet                                                                                                                                                                                           
																																																					 
  Génère : spec.md - documentation complète du projet                                                                                                                                                                
																																																					 
  ---                                                                                                                                                                                                                
  Phase 2 : Audit approfondi                                                                                                                                                                                         
																																																					 
  # Audit code complet                                                                                                                                                                                               
  /ulk:agents:code-auditor                                                                                                                                                                                       
																																																					 
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
																																																					 
  /ulk:agents:code-simplifier                                                                                                                                                                                    
  - Identifie les fichiers les plus complexes                                                                                                                                                                        
  - Priorise les opportunités de simplification                                                                                                                                                                      
  - Applique les simplifications                                                                                                                                                                                     
																																																					 
  Si des erreurs/bugs présents :                                                                                                                                                                                     
																																																					 
  /ulk:agents:robocop                                                                                                                                                                                            
  # Ou : "Fix issue #42" / "Fix this error: [stacktrace]"                                                                                                                                                            
  - Diagnostic précis                                                                                                                                                                                                
  - Fix minimal                                                                                                                                                                                                      
  - Vérification automatique                                                                                                                                                                                         
																																																					 
  Si problèmes de performance :                                                                                                                                                                                      
																																																					 
  /ulk:agents:perf-auditor                                                                                                                                                                                       
  - Core Web Vitals                                                                                                                                                                                                  
  - Bundle analysis                                                                                                                                                                                                  
  - Backend/API optimizations                                                                                                                                                                                        
																																																					 
  Si problèmes d'accessibilité :                                                                                                                                                                                     
																																																					 
  /ulk:agents:a11y-auditor                                                                                                                                                                                       
  - WCAG 2.1/2.2 compliance                                                                                                                                                                                          
  - Tests automatisés + manuels                                                                                                                                                                                      
																																																					 
  ---                                                                                                                                                                                                                
  Phase 4 : Planification des améliorations                                                                                                                                                                          
																																																					 
  # Générer un plan d'action                                                                                                                                                                                         
  /ulk:agents:todo-generator                                                                                                                                                                                     
																																																					 
  Créera un todo.md priorisé basé sur spec.md et les audits                                                                                                                                                          
																																																					 
  ---                                                                                                                                                                                                                
  🚀 Workflow Ultra-Complet (recommandé)                                                                                                                                                                             
																																																					 
  # 1. Comprendre le projet                                                                                                                                                                                          
  /ulk:agents:spec-writer                                                                                                                                                                                        
																																																					 
  # 2. Audit général                                                                                                                                                                                                 
  /ulk:agents:code-auditor                                                                                                                                                                                       
																																																					 
  # 3. Analyse stack-specific (optionnel)                                                                                                                                                                            
  /ulk:analyze:nuxt    # Si Nuxt détecté                                                                                                                                                                         
  # Ou /ulk:analyze:next, :astro, :swiftui, :spip                                                                                                                                                                
																																																					 
  # 4. Simplification                                                                                                                                                                                                
  /ulk:agents:code-simplifier                                                                                                                                                                                    
																																																					 
  # 5. Fix erreurs                                                                                                                                                                                                   
  /ulk:agents:robocop                                                                                                                                                                                            
																																																					 
  # 6. Audits spécialisés                                                                                                                                                                                            
  /ulk:agents:perf-auditor                                                                                                                                                                                       
  /ulk:agents:a11y-auditor                                                                                                                                                                                       
																																																					 
  # 7. Plan d'action                                                                                                                                                                                                 
  /ulk:agents:todo-generator                                                                                                                                                                                     
																																																					 
  # 8. Documentation finale                                                                                                                                                                                          
  /ulk:agents:sync-local                                                                                                                                                                                         
																																																					 
  ---                                                                                                                                                                                                                
  💡 Workflow Minimal (quick audit)                                                                                                                                                                                  
																																																					 
  Si vous voulez juste un diagnostic rapide :                                                                                                                                                                        
																																																					 
  # Audit code uniquement                                                                                                                                                                                            
  /ulk:agents:code-auditor                                                                                                                                                                                       
																																																					 
  Puis selon le rapport, lancez les agents spécifiques.                                                                                                                                                              
																																																					 
  ---                                                                                                                                                                                                                
  🎯 Exemple concret                                                                                                                                                                                                 
																																																					 
  # Vous : "Je veux auditer ce repo"                                                                                                                                                                                 
  /ulk:agents:spec-writer                                                                                                                                                                                        
																																																					 
  # Claude génère spec.md → détecte "Nuxt 3 + TypeScript"                                                                                                                                                            
																																																					 
  # Vous : "Audit complet maintenant"                                                                                                                                                                                
  /ulk:agents:code-auditor                                                                                                                                                                                       
																																																					 
  # Claude trouve :                                                                                                                                                                                                  
  # - 15 fichiers complexes (>20 cyclomatic complexity)                                                                                                                                                              
  # - 3 vulnérabilités sécurité                                                                                                                                                                                      
  # - Bundle size trop élevé (2.5MB)                                                                                                                                                                                 
																																																					 
  # Actions recommandées dans le rapport :                                                                                                                                                                           
  # 1. Simplifier les composants complexes                                                                                                                                                                           
  # 2. Fixer les vulnérabilités                                                                                                                                                                                      
  # 3. Optimiser le bundle                                                                                                                                                                                           
																																																					 
  # Vous lancez :                                                                                                                                                                                                    
  /ulk:agents:code-simplifier                                                                                                                                                                                    
  /ulk:agents:robocop                                                                                                                                                                                            
  /ulk:agents:perf-auditor                                                                                                                                                                                       
													  