'use client'
export default function AsciiArt() {

    return (
        <div
            style={{ fontSize: "7px" }}
            className="flex h-full w-full items-center justify-center overflow-hidden "
        >
            <pre className="profile-ascii">
                {`                                                                                  
                                            000000000000000000000                                        
                                    0000000000000000000000000000000000                                 
                                00000000000000000000000000000000000000000000                            
                            00000000000000000                 0000000000000000                         
                            00000000000000                             0000000000000                      
                        00000000000000                                   000000000000000                
                        00000000000000                                       000000000000                
                    0000000000000                                            0000000000                
                    0000000000                                                  0000000000               
                    0000000000                                                     000000000              
                    00000000     000000         000000     000000          00000     00000000             
                00000000    0000000000     0000000000 0000000000     000000000    000000000            
                000000000     00000000000 00000000000   00000000000 00000000000     000000000           
                00000000        0000000000000000000       00000000000000000000       00000000           
                00000000          000000000000000           0000000000000000000      00000000           
                000000000          0000000000000             00000000000000000       00000000           
                000000000       000000000000000000       0000000000000000000        00000000           
                0000000000    0000000000000000000000    00000000000000000000000      00000000           
                000000000    00000000000    000000000  00000000000   00000000000    000000000           
                00000000     0000000         0000000   00000000        0000000    000000000            
                000000000                                                        0000000000            
                    0000000000                                                     000000000              
                    00000000000                                                   0000000000              
                    000000000000                                              00000000000                
                    00000000000000                                         000000000000                  
                        00000000000                                0000000000000000                    
                            0000000000000                        00000000000000000                       
                                0000000000000000000             0000000000000000                          
                                000000000000000000000000000000000000000000                             
                                    00000000000000000000000000000000000                                
                                            00000000000000000000                                        
                `}
            </pre>
        </div>
    );
}
