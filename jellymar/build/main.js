! function(e, t, r) {
    "use strict";
    var i = "uniform sampler2D texture;\nuniform vec2 res;\nvoid main() {\n\tvec2 uv = gl_FragCoord.xy / res;\n\tgl_FragColor = texture2D( texture, uv );\n}",
        n = "void main() {\n    gl_Position = vec4( position, 1.0 );\n}",
        a = "int uvToIndex(vec2 uv, vec2 size) {\n\tivec2 coord = ivec2(floor(uv*size+0.5));\n\treturn coord.x + int(floor(size.x)) * coord.y;\n}\nvec2 indexToUV(float index, vec2 res){\n\tvec2 uv = vec2(mod(index/res.x,1.0), floor( index/res.y ) / res.x);\n\treturn uv;\n}\nvec2 worldPosToGridPos(vec2 particlePos, vec2 gridPos, vec2 cellSize){\n\treturn floor((particlePos - gridPos)/cellSize);\n}\nvec2 gridPosToGridUV(vec2 gridPos, int subIndex, vec2 gridRes, vec2 gridTextureRes){\n\tgridPos = clamp(gridPos, vec2(0), gridRes-vec2(1));\n\tvec2 gridUV = gridPos / gridRes;\n\tfloat fSubIndex = float(subIndex);\n\tgridUV += vec2( mod(fSubIndex,2.0), floor(fSubIndex/2.0) ) / gridTextureRes;\n\treturn gridUV;\n}\nfloat isInsideGrid(vec2 position, vec2 gridPos, vec2 gridRes, vec2 cellSize){\n\tvec2 shrink = vec2(0.02);\n\tvec2 isInside = smoothstep(gridPos+shrink,gridPos+2.0*shrink, position) * (1.0-smoothstep(gridPos+gridRes*cellSize-2.0*shrink,gridPos+gridRes*cellSize-shrink, position));\n\treturn isInside.x * isInside.y;\n}\nvec2 isInsideGrid3(vec2 position, vec2 gridPos, vec2 gridRes, vec2 cellSize, vec2 margin){\n\tvec2 isInside = smoothstep(gridPos+margin,gridPos+2.0*margin, position) * (1.0-smoothstep(gridPos+gridRes*cellSize-2.0*margin,gridPos+gridRes*cellSize-margin, position));\n\treturn isInside;\n}\n";

    function o(t) {
        this.position = new e.Vector2(0, 0), this.resolution = new e.Vector2(64, 64), this.update()
    }
    Object.assign(o.prototype, {
        update: function() {}
    });
    var s, l = (s = new Set, function(e) {
        s.has(e) || (console.warn(e), s.add(e))
    });

    function c(t) {
        t = t || {};
        var r = this.params1 = new e.Vector4(void 0 !== t.stiffness ? t.stiffness : 1700, void 0 !== t.damping ? t.damping : 6, void 0 !== t.radius ? t.radius : .5, 1e6),
            a = this.params2 = new e.Vector4(void 0 !== t.fixedTimeStep ? t.fixedTimeStep : 1 / 120, void 0 !== t.friction ? t.friction : 2, void 0 !== t.drag ? t.drag : .1, void 0 !== t.centerParticleIndex ? t.centerParticleIndex : -1);
        this.params3 = new e.Vector4(10, 10, 10, 1);
        this.params4 = new e.Vector4(0, 0, 0, 0), this.applyTorqueMaskAndCenterParticleId = new e.Vector4, this.onpoststep = t.onpoststep || function() {}, this.time = 0, this.fixedTime = 0, this.broadphase = new o, this.gravity = new e.Vector2(0, 0), t.gravity && this.gravity.copy(t.gravity), this.boxMin = new e.Vector2(-1e4, -1e4), this.boxMax = new e.Vector2(1e4, 1e4), t.boxMin && this.boxMin.copy(t.boxMin), t.boxMax && this.boxMax.copy(t.boxMax), t.gridPosition && this.broadphase.position.copy(t.gridPosition), t.gridResolution && this.broadphase.resolution.copy(t.gridResolution), this.broadphase.update(), this.materials = {}, this.textures = {}, this.dataTextures = {}, this.scenes = {}, this.renderer = t.renderer, this.particleCount = 0, this.massDirty = !0, this.applyGravityMask = new e.Vector4(0, 0, 0, 0), this.applyForceMask = new e.Vector4(0, 0, 0, 0), this.applyForce = new e.Vector2(0, 0), this.applyForceMask2 = new e.Vector4(0, 0, 0, 0), this.applyForce2 = new e.Vector2(0, 0), this.maxSubSteps = void 0 !== t.maxSubSteps ? t.maxSubSteps : 5, this.accumulator = 0, this.interpolationValue = 0;
        var s = this;

        function l() {
            var e = 2 * s.radius / s.fixedTimeStep;
            s.params1.w = e
        }
        Object.defineProperties(this, {
            radius: {
                get: function() {
                    return r.z
                },
                set: function(e) {
                    r.z = e, l()
                }
            },
            fixedTimeStep: {
                get: function() {
                    return a.x
                },
                set: function(e) {
                    a.x = e, l()
                }
            },
            stiffness: {
                get: function() {
                    return r.x
                },
                set: function(e) {
                    r.x = e
                }
            },
            damping: {
                get: function() {
                    return r.y
                },
                set: function(e) {
                    r.y = e
                }
            },
            friction: {
                get: function() {
                    return a.y
                },
                set: function(e) {
                    a.y = e
                }
            },
            drag: {
                get: function() {
                    return a.z
                },
                set: function(e) {
                    a.z = e
                }
            },
            centerParticleIndex: {
                get: function() {
                    return a.w
                },
                set: function(e) {
                    a.w = e
                }
            },
            maxParticles: {
                get: function() {
                    return Math.pow(this.textures.particleRead.width, 2)
                }
            },
            particleMassTexture: {
                get: function() {
                    return this.dataTextures.mass.texture
                }
            },
            particleTexture: {
                get: function() {
                    return this.textures.particleRead.texture
                }
            },
            particleTexturePrevious: {
                get: function() {
                    return this.textures.particleWrite.texture
                }
            },
            particleTextureSize: {
                get: function() {
                    return this.textures.particleRead.width
                }
            },
            gridTexture: {
                get: function() {
                    return this.textures.grid.texture
                }
            },
            gridTextureSize: {
                get: function() {
                    return this.textures.grid.width
                }
            }
        }), l(), this.initTextures(t.maxParticles || 8), Object.assign(this.materials, {
            textured: new e.ShaderMaterial({
                uniforms: {
                    texture: {
                        value: null
                    },
                    res: {
                        value: new e.Vector2
                    }
                },
                vertexShader: n,
                fragmentShader: i
            })
        }), this.scenes.fullscreen = new e.Scene, this.fullscreenCamera = new e.Camera;
        var c = new e.PlaneBufferGeometry(2, 2),
            d = this.fullscreenQuad = new e.Mesh(c, this.materials.textured);
        this.scenes.fullscreen.add(d), this.cellSize = new e.Vector2(this.radius, this.radius).multiplyScalar(2)
    }

    function d(e, t, r) {
        return e % t
    }

    function u(e, t, r) {
        return Math.floor(e / r)
    }

    function p(e, t, r) {
        var i = d(e, t);
        return 4 * (u(e, 0, r) * t + i)
    }

    function m(e) {
        if (e.isVector2) return "vec2(" + e.x + "," + e.y + ")";
        if (e.isVector3) return "vec3(" + e.x + "," + e.y + "," + e.z + ")";
        throw new Error("vector convert fail")
    }

    function x(t, r, i, n) {
        return new e.WebGLRenderTarget(t, r, {
            minFilter: e.NearestFilter,
            magFilter: e.NearestFilter,
            format: void 0 === n ? e.RGBAFormat : n,
            type: i
        })
    }

    function f(e, t, r) {
        return Math.min(Math.max(e, t), r)
    }

    function v(e, t) {
        return (e / t * 100).toFixed(1)
    }
    Object.assign(c.prototype, {
        getDefines: function(t) {
            var r = this.broadphase.resolution,
                i = this.textures.grid;
            return Object.assign({}, t || {}, {
                resolution: m(new e.Vector2(this.particleTextureSize, this.particleTextureSize)),
                gridResolution: m(r),
                gridTextureResolution: m(new e.Vector2(i.width, i.height))
            })
        },
        step: function(e) {
            var t = this.accumulator,
                r = this.fixedTimeStep;
            if (!(e < 0 || r <= 0)) {
                t += e;
                for (var i = 0; t >= r;) i < this.maxSubSteps && this.singleStep(), t -= r, i++;
                this.interpolationValue = t / r, this.accumulator = t
            }
        },
        singleStep: function() {
            this.saveRendererState(), this.flushData(), this.updateGrid(), this.updateParticles(), this.updateExplodeParticle(), this.updateExplodedParticle(), this.tearSprings(), this.addExplodeForce(), this.restoreRendererState(), this.fixedTime += this.fixedTimeStep, this.time += this.fixedTimeStep, this.onpoststep()
        },
        addParticle: function(e, t, r, i, n) {
            if (!(this.particleCount >= this.maxParticles)) {
                var a = this.dataTextures.particles,
                    o = p(this.particleCount, a.image.width, a.image.height);
                a.needsUpdate = !0;
                var s = a.image.data;
                s[o + 0] = e, s[o + 1] = t, s[o + 2] = 0, s[o + 3] = 0, (a = this.dataTextures.mass).needsUpdate = !0, (s = a.image.data)[o + 0] = r, s[o + 1] = 1 & i ? 1 : 0, s[o + 2] = 2 & i ? 1 : 0, s[o + 3] = 4 & i ? 1 : 0, (a = this.dataTextures.group).needsUpdate = !0, (s = a.image.data)[o + 0] = 1 & i ? 1 : 0, s[o + 1] = 2 & i ? 1 : 0, s[o + 2] = 4 & i ? 1 : 0, s[o + 3] = 8 & i ? 1 : 0, (a = this.dataTextures.springs).needsUpdate = !0, s = a.image.data;
                for (var c = 0; c < 4; c++) s[o + c] = -1;
                (a = this.dataTextures.springsDiagonal).needsUpdate = !0, s = a.image.data;
                for (c = 0; c < 4; c++) s[o + c] = -1;
                return this.particleCount++
            }
            l("Too many particles: " + this.particleCount)
        },
        connectParticles(e, t, r) {
            if (e !== t) {
                var i = this;
                n(r ? this.dataTextures.springsDiagonal : this.dataTextures.springs)
            }

            function n(r) {
                for (var n, a, o = p(e, r.image.width, r.image.height), s = p(t, r.image.width, r.image.height), l = 0; l < 4; l++)
                    if (-1 === r.image.data[o + l]) {
                        n = l;
                        break
                    }
                for (l = 0; l < 4; l++)
                    if (-1 === r.image.data[s + l]) {
                        a = l;
                        break
                    }
                if (void 0 !== n && void 0 !== a) {
                    var c = i.dataTextures.particles;
                    p(e, c.image.width, c.image.height);
                    r.image.data[o + n] = t, r.image.data[s + a] = e, r.needsUpdate = !0
                }
            }
        },
        getParticleUV: function(t) {
            var r = this.particleTextureSize;
            return new e.Vector2(d(t, r) / r, u(t, 0, r) / r)
        },
        initTextures: function(t) {
            var r = /(iPad|iPhone|iPod)/g.test(navigator.userAgent) ? e.HalfFloatType : e.FloatType,
                i = function(e) {
                    for (var t = 1; t * t < e;) t *= 2;
                    return t
                }(t);
            Object.assign(this.textures, {
                particleRead: x(i, i, r),
                particleWrite: x(i, i, r),
                springsRead: x(i, i, r),
                springsWrite: x(i, i, r),
                springsDiagonalRead: x(i, i, r),
                springsDiagonalWrite: x(i, i, r),
                grid: x(2 * this.broadphase.resolution.x, 2 * this.broadphase.resolution.y, r),
                explode: x(1, 1, r),
                exploded: x(1, 1, r),
                singleParticleData: x(1, 1, r),
                fourUnsignedBytes: x(4, 1, e.UnsignedByteType)
            }), Object.assign(this.dataTextures, {
                particles: new e.DataTexture(new Float32Array(4 * i * i), i, i, e.RGBAFormat, r),
                mass: new e.DataTexture(new Float32Array(4 * i * i), i, i, e.RGBAFormat, r),
                springs: new e.DataTexture(new Float32Array(4 * i * i), i, i, e.RGBAFormat, r),
                springsDiagonal: new e.DataTexture(new Float32Array(4 * i * i), i, i, e.RGBAFormat, r),
                group: new e.DataTexture(new Float32Array(4 * i * i), i, i, e.RGBAFormat, r),
                singlePixel: new e.DataTexture(new Float32Array(4), 1, 1, e.RGBAFormat, r)
            })
        },
        reset: function() {
            for (var e in this.time = 0, this.particleCount = 0, this.dataTextures) {
                var t = this.dataTextures[e];
                t.needsUpdate = !0;
                for (var r = t.image.data, i = 0; i < r.length; i++) r[i] = 0
            }
        },
        flushData: function() {
            this.time > 0 || (this.flushDataToRenderTarget(this.textures.particleWrite, this.dataTextures.particles), this.flushDataToRenderTarget(this.textures.particleRead, this.dataTextures.particles), this.flushDataToRenderTarget(this.textures.springsRead, this.dataTextures.springs), this.flushDataToRenderTarget(this.textures.springsDiagonalRead, this.dataTextures.springsDiagonal))
        },
        flushDataToRenderTarget: function(e, t) {
            var r = this.materials.textured;
            r.uniforms.texture.value = t, r.uniforms.res.value.set(e.width, e.height), this.fullscreenQuad.material = r, this.renderer.render(this.scenes.fullscreen, this.fullscreenCamera, e, !0), r.uniforms.texture.value = null, this.fullscreenQuad.material = null
        },
        setPositions: function(e, t) {
            this.setRenderTargetSubData(e, function(e, r) {
                var i = t[r];
                e.set(i.x, i.y, 0, 0)
            }, this.textures.particleRead, this.textures.particleWrite)
        },
        setRenderTargetSubData: function(t, r, i, n) {
            this.saveRendererState();
            if (!this.scenes.setParticleData) {
                this.materials.setParticleData = new e.ShaderMaterial({
                    uniforms: {},
                    vertexShader: a + "attribute float particleIndex;\nattribute vec4 data;\nvarying vec4 vData;\nvoid main() {\n\tvec2 uv = indexToUV(particleIndex, resolution);\n\tuv += 0.5 / resolution;\n\tgl_PointSize = 1.0;\n\tvData = data;\n\tgl_Position = vec4(2.0*uv-1.0, 0, 1);\n}",
                    fragmentShader: a + "varying vec4 vData;\nvoid main() {\n\tgl_FragColor = vData;\n}",
                    defines: this.getDefines()
                });
                var o = this.onePointPerParticleGeometry = new e.BufferGeometry,
                    s = new Float32Array(128),
                    l = new Float32Array(512);
                o.addAttribute("position", new e.BufferAttribute(new Float32Array(384), 3)).addAttribute("data", new e.BufferAttribute(l, 4)).addAttribute("particleIndex", new e.BufferAttribute(s, 1)), this.setParticleDataMesh = new e.Points(o, this.materials.setParticleData), this.scenes.setParticleData = new e.Scene, this.scenes.setParticleData.add(this.setParticleDataMesh)
            }
            for (var c = new e.Vector4, d = this.onePointPerParticleGeometry.attributes, u = 0; u < t.length; u += 128) {
                var p = Math.min(128, t.length - u);
                d.particleIndex.needsUpdate = !0, d.particleIndex.updateRange.count = p, d.data.needsUpdate = !0, d.data.updateRange.count = p;
                for (var m = 0; m < p; m++) r(c, u + m), d.particleIndex.array[m] = t[u + m], d.data.array[4 * m + 0] = c.x, d.data.array[4 * m + 1] = c.y, d.data.array[4 * m + 2] = c.z, d.data.array[4 * m + 3] = c.w;
                this.onePointPerParticleGeometry.setDrawRange(0, p), this.renderer.render(this.scenes.setParticleData, this.fullscreenCamera, i, !1), n && this.renderer.render(this.scenes.setParticleData, this.fullscreenCamera, n, !1)
            }
            this.restoreRendererState()
        },
        resetGridStencil: function() {
            if (void 0 === this.scenes.stencil2) {
                this.materials.stencil = new e.ShaderMaterial({
                    uniforms: {
                        res: {
                            value: new e.Vector2(this.textures.grid.width, this.textures.grid.height)
                        },
                        quadrant: {
                            value: 0
                        }
                    },
                    vertexShader: n,
                    fragmentShader: "uniform vec2 res;\nuniform float quadrant;\nvoid main() {\n\tvec2 coord = floor(gl_FragCoord.xy);\n\tif(mod(coord.x,2.0) + 2.0 * mod(coord.y,2.0) == quadrant){\n\t\tgl_FragColor = vec4(1,1,1,1);\n\t} else {\n\t\tdiscard;\n\t}\n}"
                }), this.scenes.stencil2 = new e.Scene;
                var t = new e.Mesh(new e.PlaneBufferGeometry(2, 2), this.materials.stencil);
                this.scenes.stencil2.add(t)
            }
            var r = this.renderer;
            r.setClearColor(0, 1), r.clearTarget(this.textures.grid, !0, !1, !0);
            var i = r.state.buffers,
                a = r.context;
            i.depth.setTest(!1), i.depth.setMask(!1), i.depth.setLocked(!0), i.color.setMask(!1), i.color.setLocked(!0), i.stencil.setTest(!0), i.stencil.setOp(a.REPLACE, a.REPLACE, a.REPLACE), i.stencil.setClear(0), i.stencil.setFunc(a.ALWAYS, 1, 4294967295);
            for (var o = 0; o < 2; o++)
                for (var s = 0; s < 2; s++) {
                    var l = o + 2 * s;
                    0 !== l && (this.materials.stencil.uniforms.quadrant.value = l, i.stencil.setFunc(a.ALWAYS, l, 4294967295), r.render(this.scenes.stencil2, this.fullscreenCamera, this.textures.grid, !1))
                }
            i.depth.setLocked(!1), i.depth.setMask(!0), i.depth.setTest(!0), i.color.setLocked(!1), i.color.setMask(!0)
        },
        updateGrid: function() {
            this.resetGridStencil();
            var t = this.renderer,
                r = t.state.buffers,
                i = t.context,
                n = this.materials.mapParticle;
            if (!n) {
                n = this.materials.mapParticle = new e.ShaderMaterial({
                    uniforms: {
                        posTex: {
                            value: null
                        },
                        posTex2: {
                            value: null
                        },
                        cellSize: {
                            value: this.cellSize
                        },
                        gridPos: {
                            value: this.broadphase.position
                        },
                        params2: {
                            value: this.params2
                        }
                    },
                    vertexShader: a + "uniform sampler2D posTex;\nuniform sampler2D posTex2;\nuniform vec2 cellSize;\nuniform vec2 gridPos;\nuniform vec4 params2;\n#define centerParticleIndex params2.w\nattribute float particleIndex;\nvarying float vParticleIndex;\nvarying vec3 vGroup;\nvoid main() {\n    vParticleIndex = particleIndex;\n    vec2 particleUV = indexToUV(particleIndex, resolution);\n    vec2 particlePos = texture2D( posTex, particleUV ).xy;\n    vec4 massGroupMask = texture2D( posTex2, particleUV );\n    vGroup = massGroupMask.yzw;\n    vec2 playerParticleUV = indexToUV(centerParticleIndex,resolution).xy;\n    vec4 playerParticlePosAndVel = texture2D(posTex,playerParticleUV);\n    vec2 gridPosition = playerParticlePosAndVel.xy - 0.5 * gridResolution * cellSize;\n    vec2 cellPos = worldPosToGridPos(particlePos, gridPosition, cellSize);\n    vec2 gridUV = gridPosToGridUV(cellPos, 0, gridResolution, gridTextureResolution);\n    gridUV += vec2(1) / gridTextureResolution;    gl_PointSize = 2.0;    gl_Position = vec4(2.0*(gridUV-0.5), 0, 1);\n}",
                    fragmentShader: a + "varying float vParticleIndex;\nvarying vec3 vGroup;\nvoid main() {\n    gl_FragColor = vec4( vParticleIndex+1.0, vGroup );}",
                    defines: this.getDefines()
                }), this.scenes.mapParticlesToGrid = new e.Scene;
                for (var o = new e.BufferGeometry, s = this.textures.particleRead.width, l = new Float32Array(3 * s * s), c = new Float32Array(s * s), d = 0; d < s * s; d++) c[d] = d;
                o.addAttribute("position", new e.BufferAttribute(l, 3)).addAttribute("particleIndex", new e.BufferAttribute(c, 1)), this.mapParticleToCellMesh = new e.Points(o, this.materials.mapParticle), this.scenes.mapParticlesToGrid.add(this.mapParticleToCellMesh)
            }
            r.stencil.setFunc(i.EQUAL, 3, 4294967295), r.stencil.setOp(i.INCR, i.INCR, i.INCR), this.mapParticleToCellMesh.material = n, n.uniforms.posTex.value = this.textures.particleRead.texture, n.uniforms.posTex2.value = this.dataTextures.mass.texture, t.render(this.scenes.mapParticlesToGrid, this.fullscreenCamera, this.textures.grid, !1), n.uniforms.posTex.value = null, n.uniforms.posTex2.value = null, this.mapParticleToCellMesh.material = null, r.stencil.setTest(!1)
        },
        updateParticles: function() {
            var t = this.renderer,
                r = t.state.buffers,
                i = (t.context, this.materials.updateParticles);
            i || (i = this.materials.updateParticles = new e.ShaderMaterial({
                uniforms: {
                    cellSize: {
                        value: this.cellSize
                    },
                    gridPos: {
                        value: this.broadphase.position
                    },
                    posTex: {
                        value: null
                    },
                    particleTex2: {
                        value: null
                    },
                    groupTex: {
                        value: null
                    },
                    particleSprings: {
                        value: null
                    },
                    particleSpringsDiagonal: {
                        value: null
                    },
                    gridTex: {
                        value: this.textures.grid.texture
                    },
                    explodeTex: {
                        value: null
                    },
                    params1: {
                        value: this.params1
                    },
                    params2: {
                        value: this.params2
                    },
                    params3: {
                        value: this.params3
                    },
                    params4: {
                        value: this.params4
                    },
                    gravity: {
                        value: this.gravity
                    },
                    applyForceMask: {
                        value: this.applyForceMask
                    },
                    applyForce: {
                        value: this.applyForce
                    },
                    applyForceMask2: {
                        value: this.applyForceMask2
                    },
                    applyForce2: {
                        value: this.applyForce2
                    },
                    applyGravityMask: {
                        value: this.applyGravityMask
                    },
                    applyTorqueMaskAndCenterParticleId: {
                        value: this.applyTorqueMaskAndCenterParticleId
                    },
                    BOX_MIN: {
                        value: this.boxMin
                    },
                    BOX_MAX: {
                        value: this.boxMax
                    },
                    tearRadius: {
                        value: 50 * this.radius
                    },
                    fixedTime: {
                        value: .01
                    }
                },
                vertexShader: n,
                fragmentShader: a + "uniform vec4 params1;\n#define stiffness params1.x\n#define damping params1.y\n#define radius params1.z\n#define maxVelocity params1.w\nuniform vec4 params2;\n#define friction params2.y\n#define drag params2.z\n#define centerParticleIndex params2.w\nuniform vec4 params3;\n#define interactionSpherePos params3.xyz\n#define interactionSphereRadius params3.w\n#define deltaTime params2.x\nuniform vec4 params4;\n#define applyTorque params4.x\n#define applyStretch params4.y\n#define applyStretchId1 params4.z\n#define applyStretchId2 params4.w\nuniform vec2 cellSize;\nuniform vec2 gridPos;\nuniform vec2 gravity;\nuniform vec2 BOX_MIN;\nuniform vec2 BOX_MAX;\nuniform vec4 applyForceMask;\nuniform vec2 applyForce;\nuniform vec4 applyForceMask2;\nuniform vec2 applyForce2;\nuniform vec4 applyGravityMask;\nuniform float tearRadius;\nuniform float fixedTime;\nuniform vec4 applyTorqueMaskAndCenterParticleId;\nuniform sampler2D posTex;\nuniform sampler2D gridTex;\nuniform sampler2D particleTex2;\nuniform sampler2D groupTex;\nuniform sampler2D particleSprings;\nuniform sampler2D particleSpringsDiagonal;\nuniform sampler2D explodeTex;\nvec2 particleForce(float STIFFNESS, float DAMPING, float DAMPING_T, float distance, float minDistance, vec2 xi, vec2 xj, vec2 vi, vec2 vj){\n    vec2 rij = xj - xi;\n    vec2 rij_unit = normalize(rij);\n    vec2 vij = vj - vi;\n    vec2 vij_t = vij - dot(vij, rij_unit) * rij_unit;\n    vec2 springForce = - STIFFNESS * (distance - max(length(rij), minDistance)) * rij_unit;\n    vec2 dampingForce = DAMPING * dot(vij,rij_unit) * rij_unit;\n    vec2 tangentForce = DAMPING_T * vij_t;\n    return springForce + dampingForce + tangentForce;\n}\nvec2 neighborSpringForce(float neighborIndex, vec2 position, vec2 velocity, float d){\n    vec2 neighborUV = indexToUV(neighborIndex, resolution);\n    vec4 neighborPositionAndVelocity = texture2D(posTex, neighborUV);\n    vec2 neighborPosition = neighborPositionAndVelocity.xy;\n    vec2 neighborVelocity = neighborPositionAndVelocity.zw;\n    vec2 r = position - neighborPosition;\n    vec2 springForce = - stiffness * (length(r) - d) * normalize(r);\n    springForce *= step(-0.5, neighborIndex);\n    return springForce;\n}\nvoid main() {\n    vec2 uv = gl_FragCoord.xy / resolution;\n    int particleIndex = uvToIndex(uv, resolution);\n    vec4 positionAndVelocity = texture2D(posTex, uv);\n    vec2 position = positionAndVelocity.xy;\n    vec2 velocity = positionAndVelocity.zw;\n    if(velocity.x > 500.0){\n        velocity = vec2(0.0);    }\n    vec4 massGroupMask = texture2D(particleTex2, uv);\n    vec4 vectorGroup2 = texture2D(groupTex, uv);\n    vec2 playerParticleUV = indexToUV(centerParticleIndex,resolution).xy;\n    vec4 playerParticlePosAndVel = texture2D(posTex,playerParticleUV);\n    vec2 gridPosition = playerParticlePosAndVel.xy - 0.5 * gridResolution * cellSize;\n    vec2 particleGridPos = worldPosToGridPos(position, gridPosition, cellSize);\n    ivec2 iGridRes = ivec2(floor(gridResolution));\n    ivec2 iParticleGridPos = ivec2(floor(particleGridPos));\n    if(iParticleGridPos.x > iGridRes.x || iParticleGridPos.y > iGridRes.y || iParticleGridPos.x < 0 || iParticleGridPos.y < 0){\n        discard;\n    }\n    const vec2 centerToCell = vec2(0.5) / (2.0 * gridTextureResolution);\n    vec2 force = vec2(0);\n    force += step(0.5, dot(applyGravityMask, vectorGroup2)) * gravity;\n    force += step(0.5, dot(applyForceMask2, vectorGroup2)) * applyForce2;\n    force += step(0.5, dot(applyForceMask, vectorGroup2)) * applyForce;\n    vec4 applyTorqueMask = vec4(applyTorqueMaskAndCenterParticleId.xyz, 0);\n    vec2 applyTorqueUV = indexToUV(applyTorqueMaskAndCenterParticleId.w,resolution).xy;\n    vec2 applyTorquePos = texture2D(posTex,applyTorqueUV).xy;\n    float torqueMultiplier = step(0.5, dot(applyTorqueMask, vectorGroup2));\n    force += torqueMultiplier * applyTorque * (cross(vec3(position - applyTorquePos,0.0), vec3(0,0,-1))).xy;\n    {\n        vec2 applyStretchPos1 = texture2D(posTex, indexToUV(applyStretchId1,resolution)).xy;\n        vec2 applyStretchPos2 = texture2D(posTex, indexToUV(applyStretchId2,resolution)).xy;\n        float len = length(applyStretchPos2 - applyStretchPos1);\n        if( len > 0.0 ){\n            force += torqueMultiplier * applyStretch * (applyStretchPos2 - applyStretchPos1) / len;\n            force += torqueMultiplier * applyStretch * (position - applyStretchPos1) / len;\n        }\n    }\n    bool shouldExplode = false;\n    for(int i=0; i<=2; i++){\n        for(int j=0; j<=2; j++){\n            ivec2 iNeighborCellGridPos = iParticleGridPos + ivec2(i-1,j-1);\n            vec2 neighborCellGridPos = vec2(iNeighborCellGridPos);\n            for(int l=1; l<4; l++){\n                vec2 neighborCellTexUV = gridPosToGridUV(neighborCellGridPos.xy, l, gridResolution, gridTextureResolution);\n                neighborCellTexUV += centerToCell;\n                vec4 gridData = texture2D(gridTex, neighborCellTexUV);\n                float fNeighborIndex = floor(gridData.x - 1.0 + 0.5);\n                int neighborIndex = int(floor(fNeighborIndex));\n                vec2 neighborUV = indexToUV(fNeighborIndex, resolution);\n                vec4 neighborPositionAndVelocity = texture2D(posTex, neighborUV);\n                vec2 neighborPosition = neighborPositionAndVelocity.xy;\n                vec2 neighborVelocity = neighborPositionAndVelocity.zw;\n                if(neighborVelocity.x > 500.0){\n                    neighborVelocity = vec2(0.0);\n                }\n                vec4 neighborVectorGroup2 = texture2D(groupTex, neighborUV);\n                float forceMultiplier =\n                    step(0.5, dot(vectorGroup2, neighborVectorGroup2)) *                    step(-0.5, fNeighborIndex) *\n                    step(0.0, neighborCellGridPos.x) *\n                    step(0.0, neighborCellGridPos.y)\n                    ;\n                if(\n                    neighborIndex != particleIndex &&                    iNeighborCellGridPos.x<iGridRes.x &&\n                    iNeighborCellGridPos.y<iGridRes.y\n                ){\n                    vec2 r = position - neighborPosition;\n                    float len = length(r);\n                    forceMultiplier *= step(len, radius * 2.0);                    if( len > 0.0 ){\n                        bool isPlayer = dot(vec4(0,0,1,0), vectorGroup2) > 0.5;\n                        bool neighborIsEnemy = dot(vec4(0,0,0,1), neighborVectorGroup2) > 0.5;\n                        vec4 neighborSpringConnections = texture2D(particleSprings, neighborUV);\n                        bool neighborIsChunk = dot(neighborSpringConnections, vec4(1.0)) > -4.0;\n                        if(isPlayer && neighborIsEnemy && neighborIsChunk){\n                            shouldExplode = true;\n                        }\n                        force += forceMultiplier * particleForce(stiffness, damping, friction, 2.0 * radius, radius, position, neighborPosition, velocity, neighborVelocity);\n                    }\n                }\n            }\n        }\n    }\n    vec4 neighborIndices = texture2D(particleSprings, uv);\n    force += neighborSpringForce(neighborIndices.x, position, velocity, radius * 2.0);\n    force += neighborSpringForce(neighborIndices.y, position, velocity, radius * 2.0);\n    force += neighborSpringForce(neighborIndices.z, position, velocity, radius * 2.0);\n    force += neighborSpringForce(neighborIndices.w, position, velocity, radius * 2.0);\n    vec4 neighborIndices2 = texture2D(particleSpringsDiagonal, uv);\n    float diagonalDistance = radius * 2.0 * 1.41;\n    force += neighborSpringForce(neighborIndices2.x, position, velocity, diagonalDistance);\n    force += neighborSpringForce(neighborIndices2.y, position, velocity, diagonalDistance);\n    force += neighborSpringForce(neighborIndices2.z, position, velocity, diagonalDistance);\n    force += neighborSpringForce(neighborIndices2.w, position, velocity, diagonalDistance);\n    vec2 boxMin = BOX_MIN;\n    vec2 boxMax = BOX_MAX;\n    vec2 dirs[2];\n    dirs[0] = vec2(1,0);\n    dirs[1] = vec2(0,1);\n    for(int i=0; i<2; i++){\n        vec2 dir = dirs[i];\n        vec2 v = velocity;\n        vec2 tangentVel = v - dot(v,dir) * dir;\n        float x = dot(dir,position) - radius;\n        if(x < dot(boxMin, dir)){\n            force += -( stiffness * (x - dot(boxMin, dir)) * dir + damping * dot(v,dir) * dir);\n            force -= friction * tangentVel;\n        }\n        x = dot(dir,position) + radius;\n        if(x > dot(boxMax, dir)){\n            dir = -dir;\n            force -= -( stiffness * (x + dot(boxMax, dir)) * dir - damping * dot(v,dir) * dir);\n            force -= friction * tangentVel;\n        }\n    }\n    \n    vec2 isInside = isInsideGrid3( position, gridPosition, gridResolution, cellSize, vec2(0.02) );\n    float timeScale = isInside.x * isInside.y;\n    float invMass = massGroupMask.x;\n    vec2 newVelocity = velocity + force * deltaTime * timeScale * invMass;\n    newVelocity *= timeScale;    newVelocity = clamp(newVelocity, -maxVelocity, maxVelocity);\n    newVelocity *= pow(1.0 - drag, deltaTime);\n    vec2 newPosition = position + newVelocity * deltaTime * timeScale;\n    \n    if(dot(neighborIndices, vec4(1.0)) > -4.0){\n        if(dot(neighborIndices2, vec4(1.0)) > -4.0){\n            if(shouldExplode){\n                newVelocity.x = 1000.0;\n            }\n        }\n    }\n    \n    gl_FragColor = vec4(newPosition, newVelocity);\n}",
                defines: this.getDefines()
            })), r.depth.setTest(!1), r.stencil.setTest(!1), this.fullscreenQuad.material = this.materials.updateParticles, i.uniforms.fixedTime.value = this.fixedTime, i.uniforms.posTex.value = this.textures.particleRead.texture, i.uniforms.particleTex2.value = this.dataTextures.mass, i.uniforms.groupTex.value = this.dataTextures.group, i.uniforms.particleSprings.value = this.textures.springsRead.texture, i.uniforms.particleSpringsDiagonal.value = this.textures.springsDiagonalRead.texture, i.uniforms.explodeTex.value = this.textures.explode.texture, t.render(this.scenes.fullscreen, this.fullscreenCamera, this.textures.particleWrite, !1), i.uniforms.explodeTex.value = null, i.uniforms.particleSpringsDiagonal.value = null, i.uniforms.particleSprings.value = null, i.uniforms.particleTex2.value = null, i.uniforms.groupTex.value = null, i.uniforms.posTex.value = null, this.fullscreenQuad.material = null, this.swapTextures("particleRead", "particleWrite")
        },
        explodeParticle: function(e) {
            var t = this.materials.mapParticleToExplode;
            t && (t.uniforms.overrideExplodeParticleIndex.value = e)
        },
        updateExplodeParticle: function() {
            var t = this.renderer,
                r = this.materials.mapParticleToExplode;
            if (!r) {
                r = this.materials.mapParticleToExplode = new e.ShaderMaterial({
                    uniforms: {
                        posTex: {
                            value: null
                        },
                        params2: {
                            value: this.params2
                        },
                        overrideExplodeParticleIndex: {
                            value: -10
                        }
                    },
                    vertexShader: a + "uniform sampler2D posTex;\nuniform vec4 params2;\nuniform float overrideExplodeParticleIndex;\nattribute float particleIndex;\nvarying float vParticleIndex;\nvoid main() {\n    vParticleIndex = particleIndex;\n    vec2 particleUV = indexToUV(particleIndex, resolution);\n    vec4 particlePosVel = texture2D(posTex, particleUV);\n    vec2 position = particlePosVel.xy;\n    vec2 velocity = particlePosVel.zw;\n    gl_PointSize = 2.0;\n    if(length(velocity) > 500.0 || abs(particleIndex - overrideExplodeParticleIndex) < 0.5){\n        gl_Position = vec4(0, 0, 0, 1);    } else {\n        gl_Position = vec4(-100, -100, 0, 1);    }\n}",
                    fragmentShader: a + "varying float vParticleIndex;\nvoid main() {\n    gl_FragColor = vec4( vParticleIndex+1.0, 0,0,1 );}\n",
                    defines: this.getDefines()
                }), this.scenes.mapParticlesToExplode = new e.Scene;
                for (var i = new e.BufferGeometry, n = this.textures.particleRead.width, o = new Float32Array(3 * n * n), s = new Float32Array(n * n), l = 0; l < n * n; l++) s[l] = l;
                i.addAttribute("position", new e.BufferAttribute(o, 3)).addAttribute("particleIndex", new e.BufferAttribute(s, 1)), this.mapParticleToExplodeMesh = new e.Points(i, r), this.scenes.mapParticlesToExplode.add(this.mapParticleToExplodeMesh)
            }
            this.mapParticleToExplodeMesh.geometry.setDrawRange(0, this.particleCount), this.mapParticleToExplodeMesh.material = r, r.uniforms.posTex.value = this.textures.particleRead.texture, t.render(this.scenes.mapParticlesToExplode, this.fullscreenCamera, this.textures.explode, !0), r.uniforms.posTex.value = null, r.uniforms.overrideExplodeParticleIndex.value = -10, this.mapParticleToExplodeMesh.material = null
        },
        updateExplodedParticle: function() {
            var t = this.renderer,
                r = this.materials.captureExploded;
            r || (r = this.materials.captureExploded = new e.ShaderMaterial({
                uniforms: {
                    explodeTex: {
                        value: null
                    },
                    params2: {
                        value: this.params2
                    }
                },
                blending: e.AdditiveBlending,
                depthTest: !1,
                transparent: !0,
                vertexShader: a + n,
                fragmentShader: a + "uniform sampler2D explodeTex;\nvoid main() {\n    float explodeId = texture2D(explodeTex, vec2(0.5)).x;\n    if(explodeId > 0.0)\n        gl_FragColor = vec4(1,1,1,1);\n    else\n        gl_FragColor = vec4(0,0,0,0);\n}",
                defines: this.getDefines()
            })), r.uniforms.explodeTex.value = this.textures.explode.texture, this.fullscreenQuad.material = r, t.render(this.scenes.fullscreen, this.fullscreenCamera, this.textures.exploded, !1), this.fullscreenQuad.material = null, r.uniforms.explodeTex.value = null
        },
        clearExploded: function() {
            this.flushDataToRenderTarget(this.textures.exploded, this.dataTextures.singlePixel)
        },
        hasExploded: function() {
            var e = new Float32Array(4);
            return this.readByteData(e, this.textures.exploded.texture), e[0] > 0
        },
        readParticleData: function(t, r) {
            var i = this.renderer,
                o = this.materials.renderSingleParticleDataToFullscreen = this.materials.renderSingleParticleDataToFullscreen || new e.ShaderMaterial({
                    uniforms: {
                        particleId: {
                            value: 0
                        },
                        particleTex: {
                            value: null
                        }
                    },
                    vertexShader: a + n,
                    fragmentShader: a + "uniform sampler2D particleTex;\nuniform float particleId;\nvoid main() {\n    vec2 uv = indexToUV(particleId, resolution);\n    vec4 positionAndVelocity = texture2D(particleTex, uv);\n    gl_FragColor = positionAndVelocity;\n}",
                    defines: this.getDefines()
                });
            this.fullscreenQuad.material = o, o.uniforms.particleTex.value = this.textures.particleRead.texture, o.uniforms.particleId.value = t, i.render(this.scenes.fullscreen, this.fullscreenCamera, this.textures.singleParticleData, !0), o.uniforms.particleTex.value = null, this.fullscreenQuad.material = null, this.readByteData(r, this.textures.singleParticleData.texture)
        },
        readByteData: function(t, r) {
            var i = this.materials.renderToReadableTexture = this.materials.renderToReadableTexture || new e.ShaderMaterial({
                uniforms: {
                    resolution: {
                        value: new e.Vector2(1, 1)
                    },
                    texture: {
                        value: null
                    }
                },
                vertexShader: n,
                fragmentShader: "uniform sampler2D texture;\nuniform vec2 resolution;\nfloat shift_right(float v, float amt) {\n\tv = floor(v) + 0.5;\n\treturn floor(v / exp2(amt));\n}\nfloat shift_left(float v, float amt) {\n\treturn floor(v * exp2(amt) + 0.5);\n}\nfloat mask_last(float v, float bits) {\n\treturn mod(v, shift_left(1.0, bits));\n}\nfloat extract_bits(float num, float from, float to) {\n\tfrom = floor(from + 0.5);\n\tto = floor(to + 0.5);\n\treturn mask_last(shift_right(num, from), to - from);\n}\nvec4 encode_float(float val) {\n\tif (val == 0.0)\n\t\treturn vec4(0, 0, 0, 0);\n\tfloat sign = val > 0.0 ? 0.0 : 1.0;\n\tval = abs(val);\n\tfloat exponent = floor(log2(val));\n\tfloat biased_exponent = exponent + 127.0;\n\tfloat fraction = ((val / exp2(exponent)) - 1.0) * 8388608.0;\n\tfloat t = biased_exponent / 2.0;\n\tfloat last_bit_of_biased_exponent = fract(t) * 2.0;\n\tfloat remaining_bits_of_biased_exponent = floor(t);\n\tfloat byte4 = extract_bits(fraction, 0.0, 8.0) / 255.0;\n\tfloat byte3 = extract_bits(fraction, 8.0, 16.0) / 255.0;\n\tfloat byte2 = (last_bit_of_biased_exponent * 128.0 + extract_bits(fraction, 16.0, 23.0)) / 255.0;\n\tfloat byte1 = (sign * 128.0 + remaining_bits_of_biased_exponent) / 255.0;\n\treturn vec4(byte4, byte3, byte2, byte1);\n}\nvoid main() {\n\tvec2 uv = gl_FragCoord.xy / resolution;\n\tvec4 data = texture2D(texture, uv);\n\tint component = int(floor(mod(gl_FragCoord.x, 4.0)));\n\tfloat theFloat = 0.0;\n\tif(component == 0) theFloat = data.x;\n\tif(component == 1) theFloat = data.y;\n\tif(component == 2) theFloat = data.z;\n\tif(component == 3) theFloat = data.w;\n\tgl_FragColor = encode_float(theFloat);\n}"
            });
            this.fullscreenQuad.material = i, i.uniforms.texture.value = r, this.renderer.render(this.scenes.fullscreen, this.fullscreenCamera, this.textures.fourUnsignedBytes, !0), i.uniforms.texture.value = null, this.fullscreenQuad.material = null;
            var a = new Uint8Array(t.buffer);
            this.renderer.readRenderTargetPixels(this.textures.fourUnsignedBytes, 0, 0, 4, 1, a)
        },
        tearSprings: function() {
            var t = this.renderer,
                r = this.materials.tearSprings;
            r || (r = this.materials.tearSprings = new e.ShaderMaterial({
                uniforms: {
                    explodeTex: {
                        value: null
                    },
                    particleTex: {
                        value: null
                    },
                    springsTex: {
                        value: null
                    },
                    tearRadius: {
                        value: 50 * this.radius
                    }
                },
                vertexShader: n,
                fragmentShader: a + "uniform sampler2D explodeTex;\nuniform sampler2D particleTex;\nuniform sampler2D springsTex;\nuniform float tearRadius;\nvoid main() {\n    vec2 uv = gl_FragCoord.xy / resolution;\n    int particleIndex = uvToIndex(uv, resolution);\n    vec4 springIds = texture2D(springsTex, uv);\n\tvec4 particlePositionAndVelocity = texture2D(particleTex, uv);\n\tvec2 position = particlePositionAndVelocity.xy;\n\tfloat explodeIndex = texture2D(explodeTex, vec2(0.5,0.5)).x - 1.0;\n\tvec2 explodeUV = indexToUV(explodeIndex, resolution);\n\tvec2 explodePosition = texture2D(particleTex, explodeUV).xy;\n\tif(explodeIndex > 0.0){\n\t\tif(length(position - explodePosition) < tearRadius){\n\t\t\tspringIds = vec4(-1);\n\t\t}\n\t\tfor(int i=0; i<4; i++){\n\t\t\tvec2 particleUV2 = indexToUV(springIds[i],resolution).xy;\n\t\t\tvec4 particlePositionAndVelocity2 = texture2D(particleTex, particleUV2);\n\t\t\tvec2 position2 = particlePositionAndVelocity2.xy;\n\t\t\tif(length(explodePosition - position2) < tearRadius){\n\t\t\t\tspringIds[i] = -1.0;\n\t\t\t}\n\t\t}\n\t}\n    gl_FragColor = springIds;\n}",
                defines: this.getDefines()
            }));
            var i = this;

            function o(e) {
                i.fullscreenQuad.material = i.materials.tearSprings, r.uniforms.explodeTex.value = i.textures.explode.texture, r.uniforms.particleTex.value = i.textures.particleRead.texture, r.uniforms.springsTex.value = i.textures[e + "Read"].texture, t.render(i.scenes.fullscreen, i.fullscreenCamera, i.textures[e + "Write"], !1), r.uniforms.springsTex.value = null, r.uniforms.particleTex.value = null, r.uniforms.explodeTex.value = null, i.fullscreenQuad.material = null, i.swapTextures(e + "Read", e + "Write")
            }
            o("springs"), o("springsDiagonal")
        },
        addExplodeForce: function() {
            var t = this.renderer,
                r = this.materials.addExplodeForce;
            r || (r = this.materials.addExplodeForce = new e.ShaderMaterial({
                uniforms: {
                    explodeTex: {
                        value: null
                    },
                    particleTex: {
                        value: null
                    },
                    tearRadius: {
                        value: 50 * this.radius
                    }
                },
                vertexShader: n,
                fragmentShader: a + "uniform sampler2D explodeTex;\nuniform sampler2D particleTex;\nuniform float tearRadius;\nvoid main() {\n    vec2 uv = gl_FragCoord.xy / resolution;\n    int particleIndex = uvToIndex(uv, resolution);\n\tvec4 particlePositionAndVelocity = texture2D(particleTex, uv);\n\tvec2 position = particlePositionAndVelocity.xy;\n\tfloat explodeIndex = texture2D(explodeTex, vec2(0.5,0.5)).x - 1.0;\n\tvec2 explodeUV = indexToUV(explodeIndex, resolution);\n\tvec2 explodePosition = texture2D(particleTex, explodeUV).xy;\n\tif(explodeIndex > 0.0){\n        float len = length(position - explodePosition);\n\t\tif(len < tearRadius && len > 0.0){\n            vec2 explodeForceDirection = normalize(position - explodePosition);\n            vec2 force = explodeForceDirection * 50.0 / 120.0;\n\t\t\tparticlePositionAndVelocity.zw += force;\n\t\t}\n\t}\n    gl_FragColor = particlePositionAndVelocity;\n}",
                defines: this.getDefines()
            })), this.fullscreenQuad.material = this.materials.addExplodeForce, r.uniforms.explodeTex.value = this.textures.explode.texture, r.uniforms.particleTex.value = this.textures.particleRead.texture, t.render(this.scenes.fullscreen, this.fullscreenCamera, this.textures.particleWrite, !1), r.uniforms.particleTex.value = null, r.uniforms.explodeTex.value = null, this.fullscreenQuad.material = null, this.swapTextures("particleRead", "particleWrite")
        },
        saveRendererState: function() {
            this.oldAutoClear = this.renderer.autoClear, this.renderer.autoClear = !1, this.oldClearColor = this.renderer.getClearColor().getHex(), this.oldClearAlpha = this.renderer.getClearAlpha(), this.renderer.setClearColor(0, 1)
        },
        restoreRendererState: function() {
            this.renderer.autoClear = this.oldAutoClear, this.renderer.setRenderTarget(null), this.renderer.setClearColor(this.oldClearColor, this.oldClearAlpha)
        },
        swapTextures: function(e, t) {
            var r = this.textures;
            if (!r[e]) throw new Error("missing texture " + e);
            if (!r[t]) throw new Error("missing texture " + t);
            var i = r[e];
            r[e] = r[t], r[t] = i
        },
        setSphereRadius: function(e, t) {
            if (0 !== e) throw new Error("Multiple spheres not supported yet");
            this.params3.w = t
        },
        getSphereRadius: function(e) {
            if (0 !== e) throw new Error("Multiple spheres not supported yet");
            return this.params3.w
        },
        setSpherePosition: function(e, t, r) {
            if (0 !== e) throw new Error("Multiple spheres not supported yet");
            this.params3.x = t, this.params3.y = r
        },
        getSpherePosition: function(e, t) {
            if (0 !== e) throw new Error("Multiple spheres not supported yet");
            t.x = this.params3.x, t.y = this.params3.y
        }
    });
    var h, g, y, b, T, w, P, S, I, A, C, M, V, R, F, E, _, D, k, U, G, z, B, L, j, O, q, N, X, W = "\nvec2 indexToUV(float index, vec2 res){\n    vec2 uv = vec2(mod(index/res.x,1.0), floor( index/res.y ) / res.x);\n    return uv;\n}\nuniform sampler2D particleTex;\nuniform sampler2D paletteTex;\nuniform float size;\nuniform float playerParticleId;\nuniform vec2 cameraMin;\nuniform vec2 cameraMax;\nuniform float time;\n#ifndef USE_VERTEX_POSITION_FOR_PARTICLES\nattribute float particleIndex;\n#endif\nattribute float particleColor;\nvarying vec3 color;\nvoid main() {\n#ifdef USE_VERTEX_POSITION_FOR_PARTICLES\n    vec4 particlePosAndVel = vec4(position.xy, vec2(0.0));\n#else\n    vec2 particleUV = indexToUV(particleIndex,vec2(PARTICLE_RESOLUTION));\n    vec4 particlePosAndVel = texture2D(particleTex,particleUV);\n#endif\n    vec2 playerParticleUV = indexToUV(playerParticleId,vec2(PARTICLE_RESOLUTION)).xy;\n    vec4 playerParticlePosAndVel = texture2D(particleTex,playerParticleUV);\n    color = texture2D(paletteTex,vec2(mod(time,1.0), particleColor)).xyz;\n    vec2 cameraPos = clamp( playerParticlePosAndVel.xy, cameraMin, cameraMax );\n    vec4 mvPosition = modelViewMatrix * vec4( particlePosAndVel.xy - cameraPos, position.z, 1.0 );\n    gl_PointSize = size;\n    gl_Position = projectionMatrix * mvPosition;\n}\n",
        Q = "varying vec3 color;\nvoid main() {\n    gl_FragColor = vec4( color, 1.0 );\n}\n",
        H = {
            firstLevel: "mario00",
            levels: {
                loading: {
                    backgroundColorPixel: [0, 0],
                    music: "",
                    cameraBox: {
                        min: {
                            x: 0,
                            y: 0
                        },
                        max: {
                            x: 256,
                            y: 224
                        }
                    },
                    killBoxes: [],
                    portals: [{
                        type: "timer",
                        timeSeconds: 2,
                        destinationLevel: "mario11-part1"
                    }],
                    gravity: {
                        x: 0,
                        y: 0
                    }
                },
                mario00: {
                    backgroundColorPixel: [0, 0],
                    music: "sound/world-1-1.mp3",
                    cameraBox: {
                        min: {
                            x: 0,
                            y: 0
                        },
                        max: {
                            x: 256,
                            y: 240
                        }
                    },
                    killBoxes: [],
                    portals: [{
                        type: "normal",
                        sound: "sound/smb_powerup.mp3",
                        color: [255, 0, 0, 255],
                        destinationLevel: "loading"
                    }],
                    gravity: {
                        x: 0,
                        y: -.05
                    },
                    colorAnimations: [{
                        color: [124, 8, 0, 255],
                        animation: [
                            [213, 157, 31, 255],
                            [142, 71, 6, 255],
                            [82, 23, 0, 255],
                            [142, 71, 6, 255],
                            [213, 157, 31, 255],
                            [213, 157, 31, 255],
                            [213, 157, 31, 255],
                            [213, 157, 31, 255]
                        ]
                    }]
                },
                "mario11-part1": {
                    backgroundColorPixel: [0, 0],
                    music: "sound/world-1-1.mp3",
                    cameraBox: {
                        min: {
                            x: 0,
                            y: 0
                        },
                        max: {
                            x: 1770,
                            y: 240
                        }
                    },
                    killBoxes: [],
                    portals: [{
                        color: [255, 0, 0, 255],
                        type: "pipe",
                        destinationLevel: "mario11-below"
                    }, {
                        color: [0, 0, 255, 255],
                        type: "normal",
                        destinationLevel: "mario11-part2"
                    }, {
                        type: "die",
                        color: [0, 255, 0, 255],
                        destinationLevel: "mario11-part1"
                    }],
                    gravity: {
                        x: 0,
                        y: -.05
                    },
                    enemyMovement: {
                        type: "leftright",
                        magnitude: .05,
                        frequency: .1
                    },
                    colorAnimations: [{
                        color: [255, 165, 66, 255],
                        animation: [
                            [255, 165, 66, 255],
                            [142, 71, 6, 255],
                            [82, 23, 0, 255],
                            [142, 71, 6, 255],
                            [255, 165, 66, 255],
                            [255, 165, 66, 255],
                            [255, 165, 66, 255],
                            [255, 165, 66, 255]
                        ]
                    }]
                },
                "mario11-part2": {
                    backgroundColorPixel: [0, 0],
                    music: "sound/world-1-1.mp3",
                    cameraBox: {
                        min: {
                            x: 0,
                            y: 0
                        },
                        max: {
                            x: 1640,
                            y: 240
                        }
                    },
                    killBoxes: [],
                    portals: [{
                        color: [255, 0, 0, 255],
                        type: "normal",
                        destinationLevel: "mario12"
                    }, {
                        type: "die",
                        color: [0, 255, 0, 255],
                        destinationLevel: "mario11-part2"
                    }],
                    gravity: {
                        x: 0,
                        y: -.05
                    },
                    colorAnimations: [{
                        color: [255, 165, 66, 255],
                        animation: [
                            [255, 165, 66, 255],
                            [142, 71, 6, 255],
                            [82, 23, 0, 255],
                            [142, 71, 6, 255],
                            [255, 165, 66, 255],
                            [255, 165, 66, 255],
                            [255, 165, 66, 255],
                            [255, 165, 66, 255]
                        ]
                    }]
                },
                "mario11-below": {
                    backgroundColorPixel: [0, 0],
                    music: "sound/02-underworld.mp3",
                    cameraBox: {
                        min: {
                            x: 0,
                            y: 0
                        },
                        max: {
                            x: 256,
                            y: 224
                        }
                    },
                    killBoxes: [],
                    portals: [{
                        color: [255, 0, 0, 255],
                        type: "pipe",
                        destinationLevel: "mario11-part2",
                        destinationPosition: [872, 155]
                    }],
                    gravity: {
                        x: 0,
                        y: -.05
                    },
                    colorAnimations: [{
                        color: [252, 152, 56, 255],
                        animation: [
                            [252, 152, 56, 255],
                            [142, 71, 6, 255],
                            [82, 23, 0, 255],
                            [142, 71, 6, 255],
                            [252, 152, 56, 255],
                            [252, 152, 56, 255],
                            [252, 152, 56, 255],
                            [252, 152, 56, 255]
                        ]
                    }]
                },
                mario12: {
                    backgroundColorPixel: [22, 22],
                    music: "sound/02-underworld.mp3",
                    cameraBox: {
                        min: {
                            x: 0,
                            y: 0
                        },
                        max: {
                            x: 1476,
                            y: 208
                        }
                    },
                    killBoxes: [],
                    portals: [{
                        color: [255, 255, 0, 255],
                        type: "die",
                        destinationLevel: "mario12"
                    }, {
                        color: [255, 0, 0, 255],
                        type: "normal",
                        destinationLevel: "mario12-part2"
                    }],
                    gravity: {
                        x: 0,
                        y: -.05
                    },
                    colorAnimations: [{
                        color: [252, 152, 56, 255],
                        animation: [
                            [252, 152, 56, 255],
                            [142, 71, 6, 255],
                            [82, 23, 0, 255],
                            [142, 71, 6, 255],
                            [252, 152, 56, 255],
                            [252, 152, 56, 255],
                            [252, 152, 56, 255],
                            [252, 152, 56, 255]
                        ]
                    }]
                },
                "mario12-part2": {
                    backgroundColorPixel: [22, 22],
                    music: "sound/02-underworld.mp3",
                    cameraBox: {
                        min: {
                            x: 0,
                            y: 0
                        },
                        max: {
                            x: 1615,
                            y: 208
                        }
                    },
                    killBoxes: [],
                    portals: [{
                        color: [255, 0, 0, 255],
                        type: "pipe",
                        destinationLevel: "mario13"
                    }, {
                        color: [0, 255, 255, 255],
                        type: "pipe",
                        destinationLevel: "mario12-part2-below"
                    }, {
                        color: [0, 255, 0, 255],
                        type: "pipe",
                        destinationLevel: "mario13"
                    }, {
                        color: [0, 0, 255, 255],
                        type: "pipe",
                        destinationLevel: "mario13"
                    }, {
                        color: [255, 255, 255, 255],
                        type: "pipe",
                        destinationLevel: "mario13"
                    }, {
                        color: [255, 255, 0, 255],
                        type: "die",
                        destinationLevel: "mario12-part2"
                    }],
                    gravity: {
                        x: 0,
                        y: -.05
                    }
                },
                "mario12-part2-below": {
                    backgroundColorPixel: [22, 22],
                    music: "sound/02-underworld.mp3",
                    cameraBox: {
                        min: {
                            x: 0,
                            y: 0
                        },
                        max: {
                            x: 272,
                            y: 208
                        }
                    },
                    killBoxes: [],
                    portals: [{
                        color: [255, 0, 0, 255],
                        type: "pipe",
                        destinationLevel: "mario12-part2"
                    }],
                    gravity: {
                        x: 0,
                        y: -.05
                    },
                    colorAnimations: [{
                        color: [252, 152, 56, 255],
                        animation: [
                            [252, 152, 56, 255],
                            [142, 71, 6, 255],
                            [82, 23, 0, 255],
                            [142, 71, 6, 255],
                            [252, 152, 56, 255],
                            [252, 152, 56, 255],
                            [252, 152, 56, 255],
                            [252, 152, 56, 255]
                        ]
                    }]
                },
                mario13: {
                    backgroundColorPixel: [22, 22],
                    music: "sound/world-1-1.mp3",
                    cameraBox: {
                        min: {
                            x: 0,
                            y: 0
                        },
                        max: {
                            x: 2628,
                            y: 240
                        }
                    },
                    killBoxes: [],
                    portals: [{
                        color: [255, 0, 0, 255],
                        type: "die",
                        destinationLevel: "mario13"
                    }, {
                        color: [0, 255, 0, 255],
                        type: "normal",
                        destinationLevel: "mario14"
                    }],
                    gravity: {
                        x: 0,
                        y: -.05
                    },
                    colorAnimations: [{
                        color: [255, 165, 66, 255],
                        animation: [
                            [255, 165, 66, 255],
                            [142, 71, 6, 255],
                            [82, 23, 0, 255],
                            [142, 71, 6, 255],
                            [255, 165, 66, 255],
                            [255, 165, 66, 255],
                            [255, 165, 66, 255],
                            [255, 165, 66, 255]
                        ]
                    }]
                },
                mario14: {
                    backgroundColorPixel: [0, 60],
                    music: "sound/04-castle.mp3",
                    cameraBox: {
                        min: {
                            x: 0,
                            y: 0
                        },
                        max: {
                            x: 1168,
                            y: 199
                        }
                    },
                    killBoxes: [],
                    portals: [{
                        color: [255, 0, 0, 255],
                        type: "die",
                        destinationLevel: "mario14"
                    }, {
                        color: [0, 255, 0, 255],
                        type: "normal",
                        destinationLevel: "mario14-part2"
                    }],
                    gravity: {
                        x: 0,
                        y: -.05
                    },
                    enemyMovement: {
                        type: "rotate",
                        magnitude: .1,
                        frequency: .25
                    },
                    colorAnimations: [{
                        color: [255, 165, 66, 255],
                        animation: [
                            [255, 165, 66, 255],
                            [142, 71, 6, 255],
                            [82, 23, 0, 255],
                            [142, 71, 6, 255],
                            [255, 165, 66, 255],
                            [255, 165, 66, 255],
                            [255, 165, 66, 255],
                            [255, 165, 66, 255]
                        ]
                    }]
                },
                "mario14-part2": {
                    backgroundColorPixel: [0, 60],
                    music: "sound/04-castle.mp3",
                    cameraBox: {
                        min: {
                            x: 0,
                            y: 0
                        },
                        max: {
                            x: 2554,
                            y: 199
                        }
                    },
                    killBoxes: [],
                    portals: [{
                        color: [0, 255, 0, 255],
                        type: "normal",
                        destinationLevel: "end-alpha"
                    }, {
                        color: [0, 0, 255, 255],
                        type: "explosionTrigger",
                        explodeParticle: [923, 136]
                    }],
                    gravity: {
                        x: 0,
                        y: -.05
                    },
                    enemyMovement: {
                        type: "rotate",
                        magnitude: .1,
                        frequency: 1
                    },
                    colorAnimations: [{
                        color: [255, 165, 66, 255],
                        animation: [
                            [255, 165, 66, 255],
                            [142, 71, 6, 255],
                            [82, 23, 0, 255],
                            [142, 71, 6, 255],
                            [255, 165, 66, 255],
                            [255, 165, 66, 255],
                            [255, 165, 66, 255],
                            [255, 165, 66, 255]
                        ]
                    }]
                },
                "end-alpha": {
                    backgroundColorPixel: [0, 0],
                    music: "sound/smb_stage_clear.mp3",
                    cameraBox: {
                        min: {
                            x: 0,
                            y: 0
                        },
                        max: {
                            x: 256,
                            y: 224
                        }
                    },
                    killBoxes: [],
                    portals: [],
                    gravity: {
                        x: 0,
                        y: -.05
                    }
                }
            },
            sfx: ["sound/jump.mp3", "sound/smb_1-up.mp3", "sound/smb_bowserfalls.mp3", "sound/smb_bowserfire.mp3", "sound/smb_breakblock.mp3", "sound/smb_bump.mp3", "sound/smb_coin.mp3", "sound/smb_fireball.mp3", "sound/smb_fireworks.mp3", "sound/smb_flagpole.mp3", "sound/smb_gameover.mp3", "sound/smb_jump-small.mp3", "sound/smb_jump-super.mp3", "sound/smb_kick.mp3", "sound/smb_mariodie.mp3", "sound/smb_pause.mp3", "sound/smb_pipe.mp3", "sound/smb_powerup_appears.mp3", "sound/smb_powerup.mp3", "sound/smb_stage_clear.mp3", "sound/smb_stomp.mp3", "sound/smb_vine.mp3", "sound/smb_warning.mp3", "sound/smb_world_clear.mp3"],
            music: {
                "sound/world-1-1.mp3": {
                    loopEnd: 125.7,
                    loopStart: .9
                },
                "sound/02-underworld.mp3": {
                    loopEnd: 50,
                    loopStart: .1
                },
                "sound/04-castle.mp3": {
                    loopEnd: 48.6,
                    loopStart: .6
                }
            }
        },
        Y = -1 !== location.search.indexOf("debug"),
        Z = document.getElementById("container"),
        J = [],
        K = [],
        $ = 0;

    function ee(e, t, r) {
        if (e && le) {
            r = r || 0;
            var i = .6 + t;
            i = f(i, 0, 1), e.playbackRate.linearRampToValueAtTime(i, le.currentTime + r)
        }
    }
    var te, re, ie, ne, ae, oe, se, le, ce, de = !1,
        ue = 0,
        pe = 0;

    function me() {
        ue++
    }

    function xe() {
        pe++, document.getElementById("loadedPercent").innerText = parseInt(pe / ue * 100, 10)
    }
    var fe = {};
    var ve, he, ge, ye = {};
    if (he = !1, ve = navigator.userAgent || navigator.vendor || window.opera, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(ve) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ve.substr(0, 4))) && (he = !0), he)(Te = document.getElementById("mobile-info")).style.display = "flex", Te.innerHTML += '<p><img src="jelly-mario.gif" width="60%"></p>';
    else if (function() {
            var e = !1;
            try {
                var t = document.createElement("canvas");
                e = !(!window.WebGLRenderingContext || !t.getContext("webgl") && !t.getContext("experimental-webgl"))
            } catch (t) {
                e = !1
            }
            if (!e) return !1;
            var r = (t = document.createElement("canvas")).getContext("webgl") || t.getContext("experimental-webgl"),
                i = r.createTexture();
            if (null === r.getExtension("OES_texture_float")) return !1;
            r.bindTexture(r.TEXTURE_2D, i), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, 2, 2, 0, r.RGBA, r.FLOAT, null), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR);
            var n = r.createFramebuffer();
            r.bindFramebuffer(r.FRAMEBUFFER, n), r.framebufferTexture2D(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0, r.TEXTURE_2D, i, 0);
            var a = r.checkFramebufferStatus(r.FRAMEBUFFER) === r.FRAMEBUFFER_COMPLETE;
            return r.deleteTexture(i), r.deleteFramebuffer(n), r.bindTexture(r.TEXTURE_2D, null), r.bindFramebuffer(r.FRAMEBUFFER, null), a
        }()) {
        var be = document.getElementById("loading");
        Promise.all([function() {
            var e = [];
            Object.keys(H.levels).forEach(t => {
                e.push(t + ".png", t + "-mass.png", t + "-groups.png", t + "-depth.png", t + "-triggers.png")
            });
            var t, r = e.map(e => (t = e, function(e) {
                return me(), new Promise(function(t, r) {
                    var i = new Image;
                    i.onload = function() {
                        xe(), ye[e] = i, t(i)
                    }, i.onerror = function() {
                        r()
                    }, i.src = e
                })
            }(t)));
            return Promise.all(r)
        }(), function() {
            var e = window.AudioContext || window.webkitAudioContext || !1;
            if (!e) return Promise.reject(new Error("WebAudio not supported."));
            le = new e, (ce = le.createGain()).gain.setValueAtTime(1, le.currentTime), ce.connect(le.destination), document.getElementById("toggleSoundCheckbox").onchange = function() {
                var e = !!document.querySelector("#toggleSoundCheckbox:checked");
                ce.gain.setValueAtTime(e ? 1 : 0, le.currentTime)
            };
            var t = Object.keys(H.levels).map(e => H.levels[e].music).filter(e => !!e);
            t = H.sfx.concat(t);
            var r, i = (t = Array.from(new Set(t))).map(e => (e = e, fe[e] ? Promise.resolve(fe[e]) : (me(), fetch(e).then(e => e.arrayBuffer()).then(e => new Promise(function(t, r) {
                le.decodeAudioData(e, t, r)
            })).then(t => {
                fe[e] = t, xe()
            }))));
            return Promise.all(i)
        }()]).then(function() {
            ! function() {
                (y = new e.WebGLRenderer).setPixelRatio(1), Z.appendChild(y.domElement), window.addEventListener("resize", Me, !1), h = new e.Scene, V = new e.Vector2(512, 512), P = new c({
                    maxSubSteps: 1,
                    gravity: new e.Vector2(0, -.05),
                    renderer: y,
                    maxParticles: 65536,
                    radius: .003,
                    stiffness: 3e3,
                    damping: 6,
                    fixedTimeStep: 1 / 120,
                    friction: 4,
                    drag: .1,
                    gridResolution: V,
                    onpoststep: function() {
                        $++
                    }
                }), I = 4 * P.maxParticles, Y && (window.world = P);
                P.radius;
                var t = 256 * P.radius;
                (g = new e.OrthographicCamera(-1, 1, 1, -1, .1, 50)).position.z = t / 2, h.add(g),
                    function() {
                        for (var t = new e.ShaderMaterial({
                                uniforms: {
                                    particleTex: {
                                        value: null
                                    },
                                    paletteTex: {
                                        value: R
                                    },
                                    size: {
                                        value: Ae()
                                    },
                                    playerParticleId: {
                                        value: ae
                                    },
                                    cameraMin: {
                                        value: new e.Vector2
                                    },
                                    cameraMax: {
                                        value: new e.Vector2
                                    },
                                    time: {
                                        value: 0
                                    }
                                },
                                vertexShader: W,
                                fragmentShader: Q,
                                defines: {
                                    PARTICLE_RESOLUTION: P.particleTextureSize
                                }
                            }), r = new Float32Array(P.maxParticles), i = 0; i < P.maxParticles; i++) r[i] = i;
                        var n = new Float32Array(P.maxParticles),
                            a = new Float32Array(3 * P.maxParticles),
                            o = new e.BufferGeometry;
                        o.addAttribute("position", new e.BufferAttribute(a, 3)).addAttribute("particleIndex", new e.BufferAttribute(r, 1)).addAttribute("particleColor", new e.BufferAttribute(n, 1)), (A = new e.Points(o, t)).frustumCulled = !1, h.add(A)
                    }(), r = new e.ShaderMaterial({
                        uniforms: {
                            particleTex: {
                                value: null
                            },
                            paletteTex: {
                                value: R
                            },
                            size: {
                                value: Ae()
                            },
                            playerParticleId: {
                                value: ae
                            },
                            cameraMin: {
                                value: new e.Vector2
                            },
                            cameraMax: {
                                value: new e.Vector2
                            },
                            time: {
                                value: 0
                            }
                        },
                        vertexShader: W,
                        fragmentShader: Q,
                        defines: {
                            PARTICLE_RESOLUTION: P.particleTextureSize,
                            USE_VERTEX_POSITION_FOR_PARTICLES: 1
                        }
                    }), i = new Float32Array(I), n = new Float32Array(3 * I), a = new e.BufferGeometry, a.addAttribute("position", new e.BufferAttribute(n, 3)).addAttribute("particleColor", new e.BufferAttribute(i, 1)), (C = new e.Points(a, r)).frustumCulled = !1, h.add(C), 0, B = {
                        38: 0,
                        40: 0,
                        39: 0,
                        37: 0,
                        87: 0,
                        65: 0,
                        83: 0,
                        68: 0,
                        32: 0
                    }, window.addEventListener("keydown", function(e) {
                        if (0 === B[e.keyCode]) switch (e.keyCode) {
                            case 38:
                                P.time;
                                break;
                            case 32:
                                _e || P.explodeParticle(ae)
                        }
                        B[e.keyCode] = 1, Ue()
                    }), window.addEventListener("keyup", function(e) {
                        0 === B[e.keyCode] && 38 === e.keyCode && P.time, B[e.keyCode] = 0, Ue()
                    }),
                    function() {
                        var t = new e.Vector2,
                            r = {
                                mousedown: function() {},
                                mousemove: function(e) {
                                    var r = y.domElement.getBoundingClientRect();
                                    t.set(e.pageX - r.left, e.pageY - r.top), t.x /= r.width, t.y /= r.height
                                },
                                mousup: function() {}
                            };
                        for (var i in r) window.addEventListener(i, r[i])
                    }(), Me();
                var r, i, n, a
            }();
            var i = H.firstLevel;
            if (Y) {
                var n = location.search.match(/level=([\-a-zA-Z0-9]+)/);
                n && (i = n[1])
            }
            for (var a in Pe(i), Ce(), P.singleStep(), P.materials) {
                var o = P.materials[a].program.diagnostics;
                if (o && !o.runnable) throw new Error("Could not compile shaders.")
            }
            be.style.display = "none",
                function() {
                    if (!Y) return;
                    (b = new t).domElement.style.position = "absolute", b.domElement.style.top = "0px", Z.appendChild(b.domElement), S = {
                        paused: !1,
                        gravity: P.gravity.y,
                        level: E,
                        zoom: 1,
                        debugTimeScale: 1
                    }, (T = new r.GUI).add(P, "stiffness", 0, 5e3, .1), T.add(P, "damping", 0, 100, .1), T.add(P, "drag", 0, 1, .01), T.add(P, "friction", 0, 10, .001), T.add(P, "fixedTimeStep", .001, .1, .001), T.add(S, "debugTimeScale", 0, 5, .01), T.add(S, "paused"), T.add(S, "gravity", -2, 2, .001).onChange(function(e) {
                        P.gravity.y = e
                    }), T.add(S, "level", Object.keys(H.levels)).onChange(function(e) {
                        Pe(e), Ce()
                    }), T.add(S, "zoom", 1, 5, .01).onChange(Me)
                }(), requestAnimationFrame(Re)
        }).catch(function(e) {
            throw be.innerText = "Something went wrong :(", e
        })
    } else {
        var Te = document.getElementById("mobile-info");
        document.getElementById("mobile-info-message").innerText = "It seems like your device doesn't support WebGL. Sorry!", Te.style.display = "flex", Te.innerHTML += '<p><img src="jelly-mario.gif" width="60%"></p>'
    }

    function we(e, t, r, i) {
        e[0] = t[0] * P.radius * 2, e[1] = 2 * P.radius * i - t[1] * P.radius * 2
    }

    function Pe(t, r) {
        if (E = t, _ = ye[t + ".png"], D = ye[t + "-mass.png"], k = ye[t + "-groups.png"], U = ye[t + "-depth.png"], G = ye[t + "-triggers.png"], Y) {
            var i = [_, D, k, U, G];
            if (!i.map(e => e.width === _.width && e.height === _.height).reduce((e, t) => e && t)) {
                var n = i.map(e => e.src + ": " + e.width + "x" + e.height).join("\n");
                throw new Error("image dimensions not equal!\n" + n)
            }
        }
        window.gtag && window.gtag("event", "screen_view", {
                app_name: "jellymar.io",
                screen_name: t
            }),
            function(e) {
                return O && fe[H.levels[e].music] == O.buffer
            }(t) || Se(), P.reset(), P.gravity.copy(H.levels[t].gravity), P.applyForceMask2.set(0, 0, 0, 1), P.applyForce2.set(-.03, 0), ge = 0, j = -100, F = new Float32Array(4), P.boxMin.set(0, 0), P.boxMax.set(2 * P.radius * _.width, 2 * P.radius * _.height), w = _.height;
        var a = Ie(_),
            o = Ie(k),
            s = Ie(D),
            l = Ie(U),
            c = Ie(G),
            d = new Uint32Array(a.buffer),
            u = new Uint32Array(o.buffer),
            p = new Uint32Array(s.buffer);
        z = new Uint32Array(c.buffer);
        for (var m = [0, 0, 0, 0], x = 4 * (H.levels[t].backgroundColorPixel[0] + _.width * H.levels[t].backgroundColorPixel[1]), f = 0; f < 4; f++) m[f] = a[f + x];
        Y && console.log(m), M = [];
        var h = Array.from(new Set(de ? u : d)),
            g = new Map;

        function b(e, t) {
            return [e, t].join("_")
        }
        var T = new Map;
        te = 1, ie = 4, ne = 8, ie |= re = 2, ne |= re, P.applyGravityMask.set(0, 0, 1, 1), T.set(4278255360, te), T.set(4278190335, re), T.set(4294901760, ie), T.set(4294967295, ne);
        var S = new e.Vector2(1e4, 1e4),
            I = new e.Vector2(-1e4, -1e4),
            A = 0;
        for (f = 0; f < _.width; f++)
            for (var C = 0; C < _.height; C++) {
                var V = a[($ = 4 * (_e = C * _.width + f)) + 0],
                    B = a[$ + 1],
                    W = a[$ + 2],
                    Q = a[$ + 3];
                if (V !== m[0] || B !== m[1] || W !== m[2]) {
                    var Z = u[_e];
                    (he = T.get(Z)) === ie && (S.set(Math.min(f, S.x), Math.min(C, S.y)), I.set(Math.max(f, I.x), Math.max(C, I.y))), T.has(Z) && A++
                }
            }
        Y && console.log("Using " + v(A, P.maxParticles) + "% of particle texture"), K.length = 0;
        for (f = 0; f < _.width; f++)
            for (C = 0; C < _.height; C++) {
                P.particleCount % 255 == 0 && P.addParticle(-100, -100, 0, 0, 0);
                var $;
                V = a[($ = 4 * (_e = C * _.width + f)) + 0], B = a[$ + 1], W = a[$ + 2], Q = a[$ + 3];
                if (V !== m[0] || B !== m[1] || W !== m[2]) {
                    var ue = 1;
                    4278190080 == p[_e] && (ue = 0);
                    var pe = [0, 0];
                    we(pe, [f, C], _.width, _.height);
                    var me = d[_e];
                    Z = u[_e];
                    de && (me = Z);
                    var xe = (h.indexOf(me) + .5) / h.length,
                        ve = l[$] / 255 * .01;
                    if (T.has(Z)) {
                        var he = T.get(Z),
                            be = P.addParticle(pe[0], pe[1], ue, he);
                        void 0 !== be && (g.set(b(f, C), be), M[be] = xe, J[be] = ve)
                    } else 0 !== Q && K.push(pe[0], pe[1], ve, xe)
                }
            }
        g.forEach(function(e, t) {
            var r, i = parseInt(t.split("_")[0], 10),
                n = parseInt(t.split("_")[1], 10);
            i > 44 && i < 48 && n > 15 && n < 19 || (void 0 !== (r = g.get(b(i, n + 1))) && P.connectParticles(e, r, !1), void 0 !== (r = g.get(b(i, n - 1))) && P.connectParticles(e, r, !1), void 0 !== (r = g.get(b(i + 1, n))) && P.connectParticles(e, r, !1), void 0 !== (r = g.get(b(i - 1, n))) && P.connectParticles(e, r, !1), void 0 !== (r = g.get(b(i - 1, n - 1))) && P.connectParticles(e, r, !0), void 0 !== (r = g.get(b(i + 1, n + 1))) && P.connectParticles(e, r, !0), void 0 !== (r = g.get(b(i - 1, n + 1))) && P.connectParticles(e, r, !0), void 0 !== (r = g.get(b(i + 1, n - 1))) && P.connectParticles(e, r, !0))
        }), L = new Map, H.levels[t].portals.forEach(function(e) {
            if ("explosionTrigger" === e.type) {
                var t = g.get(b(e.explodeParticle[0], e.explodeParticle[1]));
                if (t) {
                    var r = new Uint32Array(new Uint8Array(e.color).buffer)[0];
                    L.set(r, t)
                }
            }
        });
        var Te = Math.floor((I.x + S.x - 1) / 2),
            Pe = Math.floor((I.y + S.y + 1) / 2);
        ae = g.get(b(Te, Pe)), P.centerParticleIndex = ae, P.applyTorqueMaskAndCenterParticleId.set(0, 0, 1, ae), Y && console.log("Player particle: " + ae);
        var Ae = Math.floor((I.x + S.x) / 2),
            Ce = I.y - 8,
            Me = S.y + 10;
        oe = g.get(b(Ae, Ce)), se = g.get(b(Ae, Me)), oe && se || (console.error("Stretch particle not found!"), oe = se = -1), q = [], N = I.x - S.x + 1, X = I.y - S.y + 1;
        for (var Ve = S.y; Ve <= I.y; Ve++)
            for (var Re = S.x; Re <= I.x; Re++) {
                var Fe = g.get(b(Re, Ve)) || -1;
                q.push(Fe)
            }
        var Ee = new e.Color("rgb(" + m.join(",") + ")").getHex();
        y.setClearColor(Ee, 1), R = new e.DataTexture(new Uint8Array(4 * h.length * 8), 8, h.length, e.RGBAFormat);
        var _e, De = H.levels[t].colorAnimations || [];
        (h.forEach(function(e, t) {
            var r = 255 & e,
                i = e >> 8 & 255,
                n = e >> 16 & 255,
                a = e >> 24 & 255,
                o = De.find(function(e) {
                    return e.color[0] === r && e.color[1] === i && e.color[2] === n && e.color[3] === a
                });
            if (o) o.animation.forEach(function(e, r) {
                R.image.data[4 * (8 * t + r) + 0] = e[0], R.image.data[4 * (8 * t + r) + 1] = e[1], R.image.data[4 * (8 * t + r) + 2] = e[2], R.image.data[4 * (8 * t + r) + 3] = e[3]
            });
            else
                for (var s = 0; s < 8; s++) R.image.data[4 * (8 * t + s) + 0] = r, R.image.data[4 * (8 * t + s) + 1] = i, R.image.data[4 * (8 * t + s) + 2] = n, R.image.data[4 * (8 * t + s) + 3] = a
        }), R.needsUpdate = !0, r) && (we(_e = [0, 0], r, _.width, _.height), P.singleStep(), function(e, t) {
            for (var r = [], i = [], n = 0; n < X; n++)
                for (var a = 0; a < N; a++) {
                    var o = q[N * n + a];
                    o >= 0 && (r.push(o), i.push({
                        x: e + (a - (N - 1) / 2) * P.radius * 2,
                        y: t - (n - (X - 1) / 2) * P.radius * 2
                    }))
                }
            P.setPositions(r, i)
        }(_e[0], _e[1]));
        ! function(e) {
            if (!O && H.levels[e].music.length) {
                O = le.createBufferSource();
                var t = H.levels[e].music;
                O.buffer = fe[t], O.connect(ce), O.loop = !0, H.music[t] && (O.loopEnd = H.music[t].loopEnd, O.loopStart = H.music[t].loopStart), O.start(le.currentTime, O.loopStart), ee(O, 0)
            }
        }(t), g = null
    }

    function Se() {
        O && (O.disconnect(ce), O = null)
    }

    function Ie(e) {
        var t = document.createElement("canvas");
        t.width = e.width, t.height = e.height;
        var r = t.getContext("2d");
        return r.mozImageSmoothingEnabled = !1, r.webkitImageSmoothingEnabled = !1, r.msImageSmoothingEnabled = !1, r.imageSmoothingEnabled = !1, r.drawImage(e, 0, 0, e.width, e.height), r.getImageData(0, 0, e.width, e.height).data
    }

    function Ae() {
        var e = y.domElement.height / (g.top - g.bottom);
        return 2.5 * P.radius * e
    }

    function Ce() {
        C.material.uniforms.size.value = A.material.uniforms.size.value = Ae(), C.material.uniforms.playerParticleId.value = A.material.uniforms.playerParticleId.value = ae, C.material.uniforms.paletteTex.value = A.material.uniforms.paletteTex.value = R, Ve();
        for (var e = 0; e < P.particleCount; e++) A.geometry.attributes.particleColor.array[e] = M[e], A.geometry.attributes.position.array[3 * e + 0] = 0, A.geometry.attributes.position.array[3 * e + 1] = 0, A.geometry.attributes.position.array[3 * e + 2] = J[e];
        Y && console.log("Using " + v(K.length / 4, I) + "% of static particles");
        for (e = 0; e < I; e++)
            if (4 * e < K.length) {
                var t = K[4 * e],
                    r = K[4 * e + 1],
                    i = K[4 * e + 2],
                    n = K[4 * e + 3];
                C.geometry.attributes.particleColor.array[e] = n, C.geometry.attributes.position.array[3 * e + 0] = t, C.geometry.attributes.position.array[3 * e + 1] = r, C.geometry.attributes.position.array[3 * e + 2] = i
            } else C.geometry.attributes.position.array[3 * e + 0] = 0, C.geometry.attributes.position.array[3 * e + 1] = 0;
        for (var a in K.length = 0, A.geometry.attributes) A.geometry.attributes[a].needsUpdate = !0;
        for (var a in C.geometry.attributes) C.geometry.attributes[a].needsUpdate = !0
    }

    function Me() {
        var e = 480 * P.radius,
            t = 512 * P.radius;
        S && (t /= S.zoom, e /= S.zoom);
        var r = 0 * P.radius;
        g.left = (t - r) / -2, g.right = (t - r) / 2, g.top = (e - r) / 2, g.bottom = (e - r) / -2, g.updateProjectionMatrix();
        var i = Z.getBoundingClientRect(),
            n = i.width,
            a = i.height;
        n / a > 256 / 240 ? y.setSize(256 / 240 * a, a) : y.setSize(n, n / (256 / 240)), C.material.uniforms.size.value = A.material.uniforms.size.value = Ae(), Ve()
    }

    function Ve() {
        var e = g.right - g.left,
            t = g.top - g.bottom,
            r = A.material.uniforms.cameraMin.value,
            i = A.material.uniforms.cameraMax.value;
        if (r.set(0, 0), i.set(255, 255), E) {
            r.copy(H.levels[E].cameraBox.min), i.copy(H.levels[E].cameraBox.max);
            var n = r.y;
            r.y = w - i.y, i.y = w - n
        }
        r.multiplyScalar(2 * P.radius), i.multiplyScalar(2 * P.radius), r.set(r.x + e / 2, r.y + t / 2), i.set(i.x - e / 2, i.y - t / 2), r.x > i.x && (r.x = i.x = .5 * (r.x + i.x)), r.y > i.y && (r.y = i.y = .5 * (r.y + i.y)), C.material.uniforms.cameraMin.value.copy(r), C.material.uniforms.cameraMax.value.copy(i)
    }

    function Re(t) {
        requestAnimationFrame(Re),
            function(e) {
                P.time - j > .3 && (P.params4.y = 0);
                var t = H.levels[E].enemyMovement;
                if (t)
                    if ("rotate" == t.type) {
                        var r = t.magnitude,
                            i = t.frequency;
                        P.applyForce2.set(Math.sin(i * P.time), Math.cos(i * P.time)).multiplyScalar(r)
                    } else if ("leftright" == t.type) {
                    var r = t.magnitude,
                        i = t.frequency;
                    P.applyForce2.set(Math.floor(i * P.time) % 2 * 2 - 1, 0).multiplyScalar(r)
                }
                var n = void 0 === Fe ? 0 : (e - Fe) / 1e3;
                n *= 1.1, S && (n *= S.debugTimeScale);
                S && S.paused || (P.step(n), P.maxSubSteps = $ > 60 ? 7 : 1);
                Fe = e
            }(t), C.material.uniforms.particleTex.value = A.material.uniforms.particleTex.value = P.particleTexture, C.material.uniforms.time.value = A.material.uniforms.time.value = P.time, y.render(h, g),
            function() {
                var t = P.time;
                if (t - ge < .5) return;
                if (ge = t, _e || De) return;
                if (P.hasExploded()) return _e = !0, Ue(), Se(), void ze("sound/smb_fireworks.mp3", function() {
                    setTimeout(function() {
                        ze("sound/smb_mariodie.mp3", function() {
                            P.clearExploded(), _e = !1, Pe(E), Ce()
                        })
                    }, 1e3)
                });
                var r = H.levels[E].portals.find(e => "timer" === e.type);
                if (r) null === Ee ? Ee = t : t - Ee > r.timeSeconds && (Pe(r.destinationLevel), Ce());
                else {
                    P.readParticleData(ae, F), ee(O, ke(), 1);
                    var i = new e.Vector2(f(Math.floor(F[0] / (2 * P.radius)), 0, G.width), f(G.height - Math.floor(F[1] / (2 * P.radius)), 0, G.width)),
                        n = z[i.x + G.width * i.y],
                        a = null;
                    if (H.levels[E].portals.forEach(function(e) {
                            var t = new Uint32Array(new Uint8Array(e.color).buffer);
                            n === t[0] && (a = e)
                        }), a && "die" === a.type) return void P.explodeParticle(ae);
                    if (a) {
                        var o = function() {
                            Pe(a.destinationLevel, a.destinationPosition), Ce(), De = !1
                        };
                        if ("pipe" === a.type) De = !0, ze("sound/smb_pipe.mp3", o);
                        else if ("explosionTrigger" === a.type) {
                            var s = L.get(n);
                            s && (P.explodeParticle(s), P.singleStep(), P.clearExploded(), L.set(n, 0))
                        } else a.sound ? (De = !0, ze(a.sound, o)) : (De = !0, o())
                    }
                }
            }(), void 0 !== b && b.update()
    }
    var Fe, Ee = null,
        _e = !1,
        De = !1;

    function ke() {
        return Math.sqrt(Math.pow(F[2], 2), Math.pow(F[3], 2))
    }

    function Ue() {
        if (_e) P.applyForce.set(0, 0), P.params4.set(0, 0, 0, 0);
        else {
            P.params4.x = -1.2 * (B[39] - B[37]), P.applyForceMask.set(0, 0, 1, 0), P.applyForce.set(.1 * (B[39] - B[37]), 0 * (B[38] - B[40])), P.time - j > 1 && B[38] && (P.params4.y = -.5 * Math.min(0, -(B[38] - B[40])), P.params4.z = ae, P.params4.w = se, j = P.time, ze("sound/jump.mp3"))
        }
    }
    var Ge = {};

    function ze(e, t) {
        Ge[e] && Ge[e].disconnect(ce);
        var r = le.createBufferSource();
        ee(r, ke()), r.buffer = fe[e], r.connect(ce), t && (r.onended = t), r.start(), Ge[e] = r
    }
}(THREE, Stats, dat);