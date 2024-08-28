import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { removeFileFromS3 } from "../utils";

interface CreatePickData {
    title: string;
    link: string;
    image: string;
    category: string;
    price: number;
    featured: boolean;
    description?: string;
    color?: string;
    caseMaterial?: string;
    layoutType?: string;
    pcbType?: string;
    assemblyType?: string;
    soundType?: string;
    keycapMaterial?: string;
    profileType?: string;
    switchType?: string;
    preLubed?: boolean;
}
interface UpdateNoImage {
    title: string;
    link: string;
    category: string;
    price: number;
    featured: boolean;
    description?: string;
    color?: string;
    caseMaterial?: string;
    layoutType?: string;
    pcbType?: string;
    assemblyType?: string;
    soundType?: string;
    keycapMaterial?: string;
    profileType?: string;
    switchType?: string;
    preLubed?: boolean;
}

export const pickRouter = createTRPCRouter({
    getAll: publicProcedure
        .input(
            z.object({
                searchQuery: z.string().optional(),
            }),
        )
        .query(({ input, ctx }) => {
            const { searchQuery } = input;
            const whereFilters = {
                AND: [
                    searchQuery
                        ? {
                              OR: [
                                  {
                                      title: {
                                          contains: searchQuery,
                                      },
                                  },
                                  {
                                      description: {
                                          contains: searchQuery,
                                      },
                                  },
                              ],
                          }
                        : {},
                ].filter((obj) => Object.keys(obj).length > 0),
            };
            return ctx.db.pick.findMany({
                where: {
                    ...whereFilters,
                },
                take: 50,
            });
        }),

    create: protectedProcedure
        .input(
            z.object({
                title: z.string(),
                link: z.string(),
                category: z.string(),
                price: z.number(),
                featured: z.boolean(),
                description: z.string().optional(),
                color: z.string().optional(),
                caseMaterial: z.string().optional(),
                layoutType: z.string().optional(),
                pcbType: z.string().optional(),
                assemblyType: z.string().optional(),
                soundType: z.string().optional(),
                keycapMaterial: z.string().optional(),
                profileType: z.string().optional(),
                switchType: z.string().optional(),
                preLubed: z.boolean().optional(),
                images: z
                    .array(
                        z.object({
                            link: z.string(),
                        }),
                    )
                    .optional(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const {
                title,
                link,
                category,
                caseMaterial,
                color,
                description,
                keycapMaterial,
                preLubed,
                profileType,
                price,
                featured,
                layoutType,
                assemblyType,
                soundType,
                switchType,
                pcbType,
                images,
            } = input;

            if (!ctx.session.user.isAdmin) {
                throw new Error(
                    "You don't have the right, O you don't have the right",
                );
            }

            if (images && images[0]) {
                const createData: CreatePickData = {
                    title,
                    link,
                    category,
                    price,
                    featured,
                    image: images[0].link,
                };
                if (description) {
                    createData.description = description;
                }

                if (color) {
                    createData.color = color;
                }

                if (caseMaterial) {
                    createData.caseMaterial = caseMaterial;
                }

                if (layoutType) {
                    createData.layoutType = layoutType;
                }

                if (pcbType) {
                    createData.pcbType = pcbType;
                }

                if (assemblyType) {
                    createData.assemblyType = assemblyType;
                }

                if (soundType) {
                    createData.soundType = soundType;
                }

                if (keycapMaterial) {
                    createData.keycapMaterial = keycapMaterial;
                }

                if (profileType) {
                    createData.profileType = profileType;
                }

                if (switchType) {
                    createData.switchType = switchType;
                }

                if (preLubed !== null) {
                    createData.preLubed = preLubed;
                }

                await ctx.db.pick.create({
                    data: createData,
                });

                return "Successfully created pick";
            }
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                title: z.string(),
                link: z.string(),
                category: z.string(),
                price: z.number(),
                featured: z.boolean(),
                image: z.string(),
                description: z.string().optional(),
                color: z.string().optional(),
                caseMaterial: z.string().optional(),
                layoutType: z.string().optional(),
                pcbType: z.string().optional(),
                assemblyType: z.string().optional(),
                soundType: z.string().optional(),
                keycapMaterial: z.string().optional(),
                profileType: z.string().optional(),
                switchType: z.string().optional(),
                preLubed: z.boolean().optional(),
                images: z
                    .array(
                        z.object({
                            link: z.string(),
                        }),
                    )
                    .optional(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const {
                id,
                title,
                link,
                category,
                caseMaterial,
                color,
                description,
                keycapMaterial,
                preLubed,
                profileType,
                price,
                featured,
                layoutType,
                assemblyType,
                soundType,
                switchType,
                pcbType,
                images,
                image,
            } = input;

            if (!ctx.session.user.isAdmin) {
                throw new Error(
                    "You don't have the right, O you don't have the right",
                );
            }

            if (images && images[0]) {
                try {
                    await removeFileFromS3(image);
                } catch (err) {
                    console.error("An unexpected AWS error occurred:", err);
                }

                const updateData: CreatePickData = {
                    title,
                    link,
                    category,
                    price,
                    featured,
                    image: images[0].link,
                };
                if (description) {
                    updateData.description = description;
                }

                if (color) {
                    updateData.color = color;
                }

                if (caseMaterial) {
                    updateData.caseMaterial = caseMaterial;
                }

                if (layoutType) {
                    updateData.layoutType = layoutType;
                }

                if (pcbType) {
                    updateData.pcbType = pcbType;
                }

                if (assemblyType) {
                    updateData.assemblyType = assemblyType;
                }

                if (soundType) {
                    updateData.soundType = soundType;
                }

                if (keycapMaterial) {
                    updateData.keycapMaterial = keycapMaterial;
                }

                if (profileType) {
                    updateData.profileType = profileType;
                }

                if (switchType) {
                    updateData.switchType = switchType;
                }

                if (preLubed !== null) {
                    updateData.preLubed = preLubed;
                }

                await ctx.db.pick.update({
                    where: {
                        id: id,
                    },
                    data: updateData,
                });

                return "Successfully updated pick";
            } else {
                const updateData: UpdateNoImage = {
                    title,
                    link,
                    category,
                    price,
                    featured,
                };
                if (description) {
                    updateData.description = description;
                }

                if (color) {
                    updateData.color = color;
                }

                if (caseMaterial) {
                    updateData.caseMaterial = caseMaterial;
                }

                if (layoutType) {
                    updateData.layoutType = layoutType;
                }

                if (pcbType) {
                    updateData.pcbType = pcbType;
                }

                if (assemblyType) {
                    updateData.assemblyType = assemblyType;
                }

                if (soundType) {
                    updateData.soundType = soundType;
                }

                if (keycapMaterial) {
                    updateData.keycapMaterial = keycapMaterial;
                }

                if (profileType) {
                    updateData.profileType = profileType;
                }

                if (switchType) {
                    updateData.switchType = switchType;
                }

                if (preLubed !== null) {
                    updateData.preLubed = preLubed;
                }

                await ctx.db.pick.update({
                    where: {
                        id: id,
                    },
                    data: updateData,
                });
                return "Successfully updated pick";
            }
        }),

    delete: protectedProcedure
        .input(
            z.object({
                id: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { id } = input;
            if (!ctx.session.user.isAdmin) {
                throw new Error(
                    "You don't have the right, O you don't have the right",
                );
            }
            const pickCheck = await ctx.db.pick.findFirst({
                where: {
                    id: id,
                },
            });

            if (pickCheck && pickCheck.image) {
                try {
                    await removeFileFromS3(pickCheck.image);
                } catch (err) {
                    console.error("An unexpected AWS error occurred:", err);
                }
            }

            await ctx.db.pick.delete({
                where: { id: id },
            });
        }),
});